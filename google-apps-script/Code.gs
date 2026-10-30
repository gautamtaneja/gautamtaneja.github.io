/**
 * Google Apps Script - Production Portfolio Contact Form Processor
 * 
 * Free, serverless contact form backend powered by Google Apps Script & Gmail.
 * Author: Gautam Taneja
 * 
 * Capabilities:
 * - Server-side input validation and length enforcement
 * - Honeypot spam defense (rejects bot automated submissions)
 * - Anti-abuse rate throttling using CacheService & LockService
 * - Safe HTML sanitization for email notifications
 * - Proper 'replyTo' header configuration (replies go to visitor, not self)
 * - Cross-Origin communication via secure iframe postMessage with correlation tokens
 * - Fallback direct JSON/HTML responses
 */

// Configuration Defaults (Override via Script Properties)
var DEFAULT_CONFIG = {
  RECIPIENT_EMAIL: 'gautam.debug@gmail.com', // Primary notification inbox
  SUBJECT_PREFIX: '[Portfolio Contact]',
  MAX_SUBMISSIONS_PER_IP_OR_EMAIL: 5,
  THROTTLE_WINDOW_SECONDS: 600 // 10 minutes
};

/**
 * Run this function once in the Apps Script editor to authorize Gmail scopes
 * and configure your custom recipient email in PropertiesService.
 */
function setupScriptProperties() {
  var props = PropertiesService.getScriptProperties();
  props.setProperty('RECIPIENT_EMAIL', DEFAULT_CONFIG.RECIPIENT_EMAIL);
  Logger.log('Configured RECIPIENT_EMAIL as: ' + props.getProperty('RECIPIENT_EMAIL'));
}

/**
 * Test function to verify Gmail permissions and delivery directly from the editor.
 */
function testSendMail() {
  var recipient = getRecipientEmail_();
  MailApp.sendEmail({
    to: recipient,
    subject: '[Test] Portfolio Mailer Diagnostics',
    body: 'Your Google Apps Script contact endpoint is authorized and ready to receive messages.'
  });
  Logger.log('Test email successfully dispatched to ' + recipient);
}

/**
 * Handles GET requests. Serves a diagnostic status or fallback standalone form.
 */
function doGet(e) {
  var html = '<!DOCTYPE html><html><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<title>Portfolio Contact Service</title>' +
    '<style>' +
    'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 80vh; }' +
    '.card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 2rem; max-width: 480px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }' +
    'h1 { font-size: 1.25rem; color: #38bdf8; margin-bottom: 0.5rem; }' +
    'p { color: #94a3b8; font-size: 0.95rem; line-height: 1.5; }' +
    '.status-badge { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 9999px; background: rgba(16, 185, 129, 0.2); color: #34d399; font-weight: 600; font-size: 0.85rem; margin-top: 1rem; }' +
    '</style></head><body>' +
    '<div class="card">' +
    '<h1>Portfolio Contact Service</h1>' +
    '<p>The Google Apps Script mail delivery endpoint is online and functioning normally.</p>' +
    '<span class="status-badge">● Operational</span>' +
    '</div></body></html>';

  return HtmlService.createHtmlOutput(html)
    .setTitle('Portfolio Contact Endpoint')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Handles POST requests submitted from the portfolio contact form.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for concurrent executions
  var lockAcquired = lock.tryLock(10000);

  try {
    var params = parsePostData_(e);
    var correlationToken = params.correlationToken || '';
    var clientOrigin = params.clientOrigin || '*';

    // 1. Honeypot check (defense against automated spam scrapers)
    if (params.honeypot && params.honeypot.toString().trim() !== '') {
      Logger.log('Spam bot detected via honeypot: ' + params.honeypot);
      // Return neutral success to deceive spam bots without consuming email quota
      return respondHtml_(correlationToken, true, 'Submission processed.', clientOrigin);
    }

    // 2. Server-side validation
    var validation = validateParams_(params);
    if (!validation.valid) {
      return respondHtml_(correlationToken, false, validation.message, clientOrigin);
    }

    // 3. Abuse throttling via CacheService
    var cache = CacheService.getScriptCache();
    var throttleKey = 'throttle_' + sanitizeKey_(params.email);
    var submissionCount = parseInt(cache.get(throttleKey) || '0', 10);

    if (submissionCount >= DEFAULT_CONFIG.MAX_SUBMISSIONS_PER_IP_OR_EMAIL) {
      return respondHtml_(
        correlationToken,
        false,
        'Too many submissions. Please wait a few minutes before trying again or email directly.',
        clientOrigin
      );
    }

    // 4. Send email notification via MailApp
    var recipient = getRecipientEmail_();
    var emailSubject = DEFAULT_CONFIG.SUBJECT_PREFIX + ' ' + params.subject.substring(0, 100);

    var plainTextBody = [
      'New message from portfolio contact form:',
      '----------------------------------------',
      'Name:    ' + params.name,
      'Email:   ' + params.email,
      'Subject: ' + params.subject,
      'Date:    ' + new Date().toUTCString(),
      '----------------------------------------',
      'Message:',
      params.message,
      '----------------------------------------',
      'Correlation Token: ' + correlationToken
    ].join('\n');

    var htmlBody = [
      '<div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff; color: #1e293b;">',
      '  <div style="border-bottom: 2px solid #3b82f6; padding-bottom: 12px; margin-bottom: 20px;">',
      '    <h2 style="margin: 0; color: #0f172a; font-size: 20px;">New Portfolio Contact Message</h2>',
      '    <p style="margin: 4px 0 0; color: #64748b; font-size: 13px;">' + escapeHtml_(new Date().toUTCString()) + '</p>',
      '  </div>',
      '  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">',
      '    <tr><td style="padding: 8px 0; color: #64748b; width: 80px; font-weight: 600;">From:</td><td style="padding: 8px 0; color: #0f172a; font-weight: 600;">' + escapeHtml_(params.name) + '</td></tr>',
      '    <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td><td style="padding: 8px 0;"><a href="mailto:' + escapeHtml_(params.email) + '" style="color: #2563eb; text-decoration: none;">' + escapeHtml_(params.email) + '</a></td></tr>',
      '    <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Subject:</td><td style="padding: 8px 0; color: #0f172a;">' + escapeHtml_(params.subject) + '</td></tr>',
      '  </table>',
      '  <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px; margin-bottom: 24px;">',
      '    <p style="margin: 0 0 8px; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b;">Message Content</p>',
      '    <div style="color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">' + escapeHtml_(params.message) + '</div>',
      '  </div>',
      '  <div style="font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 12px;">',
      '    Hit Reply to respond directly to <strong>' + escapeHtml_(params.email) + '</strong>.',
      '  </div>',
      '</div>'
    ].join('');

    MailApp.sendEmail({
      to: recipient,
      replyTo: params.email,
      subject: emailSubject,
      body: plainTextBody,
      htmlBody: htmlBody
    });

    // Increment rate limiter cache
    cache.put(throttleKey, (submissionCount + 1).toString(), DEFAULT_CONFIG.THROTTLE_WINDOW_SECONDS);

    Logger.log('Message delivered successfully from: ' + params.email);
    return respondHtml_(correlationToken, true, 'Thank you! Your message has been sent successfully.', clientOrigin);

  } catch (error) {
    Logger.log('Error processing submission: ' + error.toString());
    return respondHtml_(
      correlationToken,
      false,
      'An internal server error occurred while sending your message. Please try again or reach out directly.',
      clientOrigin
    );
  } finally {
    if (lockAcquired) {
      lock.releaseLock();
    }
  }
}

/**
 * Parses parameters from either standard POST body or JSON payload.
 */
function parsePostData_(e) {
  var result = {};
  if (!e) return result;

  // Form URL-encoded or multipart parameters
  if (e.parameter) {
    for (var key in e.parameter) {
      if (e.parameter.hasOwnProperty(key)) {
        result[key] = e.parameter[key];
      }
    }
  }

  // JSON contents if submitted with application/json
  if (e.postData && e.postData.contents) {
    try {
      var json = JSON.parse(e.postData.contents);
      for (var jKey in json) {
        if (json.hasOwnProperty(jKey)) {
          result[jKey] = json[jKey];
        }
      }
    } catch (ignore) {
      // Body was not JSON; form parameters already extracted
    }
  }

  return result;
}

/**
 * Validates form parameters server-side.
 */
function validateParams_(params) {
  var name = (params.name || '').toString().trim();
  var email = (params.email || '').toString().trim();
  var subject = (params.subject || '').toString().trim();
  var message = (params.message || '').toString().trim();

  if (!name || name.length < 2 || name.length > 100) {
    return { valid: false, message: 'Please provide a valid name (2-100 characters).' };
  }

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!email || email.length > 150 || !emailRegex.test(email)) {
    return { valid: false, message: 'Please provide a valid email address.' };
  }

  if (!subject || subject.length < 3 || subject.length > 200) {
    return { valid: false, message: 'Please provide a subject line (3-200 characters).' };
  }

  if (!message || message.length < 10 || message.length > 5000) {
    return { valid: false, message: 'Message must be between 10 and 5000 characters.' };
  }

  return { valid: true };
}

/**
 * Returns HTML output with postMessage to acknowledge submission to parent window.
 */
function respondHtml_(correlationToken, success, message, clientOrigin) {
  var safeToken = sanitizeString_(correlationToken);
  var safeMsg = sanitizeString_(message);
  var targetOrigin = (clientOrigin && clientOrigin !== '*' && clientOrigin.indexOf('http') === 0) 
    ? clientOrigin 
    : '*';

  var htmlContent = '<!DOCTYPE html><html><head><meta charset="utf-8">' +
    '<title>Submission Result</title></head><body>' +
    '<script>' +
    '(function() {' +
    '  var payload = {' +
    '    type: "PORTFOLIO_CONTACT_RESPONSE",' +
    '    correlationToken: ' + JSON.stringify(safeToken) + ',' +
    '    success: ' + (success ? 'true' : 'false') + ',' +
    '    message: ' + JSON.stringify(safeMsg) + ',' +
    '    timestamp: ' + Date.now() +
    '  };' +
    '  if (window.parent && window.parent !== window) {' +
    '    window.parent.postMessage(payload, ' + JSON.stringify(targetOrigin) + ');' +
    '  }' +
    '})();' +
    '</script>' +
    '<p style="font-family:sans-serif;color:#334155;font-size:14px;padding:20px;">' +
    (success ? 'Submission acknowledged.' : 'Submission encountered an error: ' + safeMsg) +
    '</p>' +
    '</body></html>';

  return HtmlService.createHtmlOutput(htmlContent)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Escapes characters for HTML output to prevent XSS / markup corruption in email.
 */
function escapeHtml_(text) {
  if (!text) return '';
  return text
    .toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Strips control characters for safe postMessage serialization.
 */
function sanitizeString_(str) {
  if (!str) return '';
  return str.toString().replace(/[\r\n\t]/g, ' ').substring(0, 500);
}

/**
 * Cleans string for use in cache keys.
 */
function sanitizeKey_(str) {
  if (!str) return 'anonymous';
  return str.toString().toLowerCase().replace(/[^a-z0-9_]/g, '_').substring(0, 50);
}

/**
 * Retrieves the configured recipient email from Script Properties or defaults.
 */
function getRecipientEmail_() {
  var props = PropertiesService.getScriptProperties();
  var configuredEmail = props.getProperty('RECIPIENT_EMAIL');
  if (configuredEmail && configuredEmail.trim() !== '') {
    return configuredEmail.trim();
  }
  return DEFAULT_CONFIG.RECIPIENT_EMAIL;
}

