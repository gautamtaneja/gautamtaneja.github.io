import React, { useState, useEffect, useRef } from 'react';
import { Mail, Send, CheckCircle2, AlertTriangle, Copy, Check, MapPin, ExternalLink, RefreshCw, ShieldAlert } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';
import { validateContactForm, sanitizeInput, VALIDATION_LIMITS, type ValidationErrors, type ContactFormData } from '../lib/validation';

type FormStatus = 'idle' | 'submitting' | 'verified_success' | 'dispatched_neutral' | 'error';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [currentCorrelationToken, setCurrentCorrelationToken] = useState<string>('');

  const formRef = useRef<HTMLFormElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const appsScriptUrl = portfolioConfig.personal.appsScriptUrl;
  const isBackendConfigured = Boolean(appsScriptUrl && appsScriptUrl.trim() !== '');

  // Listen for secure postMessage acknowledgment from Google Apps Script iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== 'object') return;

      if (data.type === 'PORTFOLIO_CONTACT_RESPONSE') {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        if (data.correlationToken && data.correlationToken === currentCorrelationToken) {
          if (data.success === true) {
            setStatus('verified_success');
            setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
            setErrors({});
          } else {
            setStatus('error');
            setErrorMessage(data.message || 'The email delivery service rejected the request.');
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentCorrelationToken]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolioConfig.personal.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (!isBackendConfigured) {
      setStatus('dispatched_neutral');
      return;
    }

    const token = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : `${Date.now()}_${Math.random().toString(36).substring(2, 12)}`;
    
    setCurrentCorrelationToken(token);
    setStatus('submitting');
    setErrorMessage('');

    timeoutRef.current = setTimeout(() => {
      if (status === 'submitting') {
        setStatus('dispatched_neutral');
      }
    }, 10000);

    if (formRef.current) {
      const tokenInput = formRef.current.querySelector<HTMLInputElement>('input[name="correlationToken"]');
      if (tokenInput) tokenInput.value = token;

      const originInput = formRef.current.querySelector<HTMLInputElement>('input[name="clientOrigin"]');
      if (originInput) originInput.value = window.location.origin;

      formRef.current.submit();
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage('');
    setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
  };

  return (
    <section id="contact" aria-label="Contact Section" className="py-20 bg-slate-100/60 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center sm:text-left mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20">
            <Mail className="w-3.5 h-3.5" />
            <span>06. GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Let's Discuss Engineering Opportunities
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
            Whether you have a technical question, an open full-stack role, or an architectural challenge to solve, my inbox is open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Info & Quick Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Direct Inquiries
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  I typically respond within 24 business hours. You can either use the form or send a message directly to my email address below.
                </p>
              </div>

              {/* Email Copy Card */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Primary Email
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${portfolioConfig.personal.email}`}
                    className="text-sm font-mono text-sky-600 dark:text-sky-400 hover:underline truncate"
                  >
                    {portfolioConfig.personal.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                    title="Copy email address"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-semibold text-slate-900 dark:text-white">Location</span>
                  <span className="text-slate-500 dark:text-slate-400">{portfolioConfig.personal.location} (IST / UTC+5:30)</span>
                </div>
              </div>

              {/* Backend Architecture Note */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1.5">
                <div className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Zero-Cost Serverless Delivery</span>
                </div>
                <p>
                  Powered by a custom Google Apps Script Web App integrated with Gmail for instant routing with zero third-party tracking.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xl">
              {/* Form State Banners */}
              {status === 'verified_success' && (
                <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 space-y-3 animate-in fade-in">
                  <div className="flex items-center gap-2.5 font-bold text-lg text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                    <span>Message Delivered Successfully</span>
                  </div>
                  <p className="text-sm text-emerald-700 dark:text-emerald-200/90 leading-relaxed">
                    Thank you, {sanitizeInput(formData.name) || 'there'}! Your inquiry has been delivered directly to my inbox via Google Apps Script. I will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Send Another Message</span>
                  </button>
                </div>
              )}

              {status === 'dispatched_neutral' && (
                <div className="p-6 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-500/30 text-sky-900 dark:text-sky-200 space-y-3 animate-in fade-in">
                  <div className="flex items-center gap-2.5 font-bold text-lg text-sky-800 dark:text-sky-300">
                    <AlertTriangle className="w-6 h-6 shrink-0 text-amber-500 dark:text-amber-400" />
                    <span>Submission Dispatched</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Your form request was sent to the Google Apps Script delivery endpoint. Because some browser extensions block cross-origin iframe notifications, we do not show a false confirmation.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={`mailto:${portfolioConfig.personal.email}?subject=${encodeURIComponent(
                        formData.subject || 'Portfolio Inquiry'
                      )}&body=${encodeURIComponent(
                        `From: ${formData.name}\n\n${formData.message}`
                      )}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email Directly</span>
                    </a>
                    {appsScriptUrl && (
                      <a
                        href={appsScriptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Direct Apps Script Endpoint</span>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-3.5 py-2 text-xs font-medium rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                      Reset Form
                    </button>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30 text-rose-800 dark:text-rose-300 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 shrink-0 text-rose-500 dark:text-rose-400 mt-0.5" />
                  <div className="space-y-1 text-sm">
                    <div className="font-semibold text-rose-800 dark:text-rose-200">Submission Error</div>
                    <p className="text-xs text-rose-700 dark:text-rose-300/90">{errorMessage || 'Could not deliver the message. Please check your network or try direct email.'}</p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="text-xs text-rose-600 dark:text-rose-400 underline hover:text-rose-800 dark:hover:text-rose-200 pt-1"
                    >
                      Edit form and retry
                    </button>
                  </div>
                </div>
              )}

              {status !== 'verified_success' && status !== 'dispatched_neutral' && (
                <>
                  {!isBackendConfigured && (
                    <div className="mb-6 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2.5">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 dark:text-amber-400" />
                      <span>
                        <strong>Setup Notice:</strong> Set <code className="font-mono bg-amber-100 dark:bg-amber-900/40 px-1 py-0.5 rounded">VITE_APPS_SCRIPT_URL</code> in <code className="font-mono">.env</code> to enable live email delivery.
                      </span>
                    </div>
                  )}

                  {/* Native HTML Form targeting hidden iframe for robust zero-cors delivery */}
                  <form
                    ref={formRef}
                    action={appsScriptUrl || '#'}
                    method="POST"
                    target="hidden_apps_script_iframe"
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    {/* Hidden fields for cross-origin postMessage acknowledgment */}
                    <input type="hidden" name="correlationToken" value="" />
                    <input type="hidden" name="clientOrigin" value="" />

                    {/* Honeypot Spam Field: Invisible to normal users and screen-readers */}
                    <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                      <label htmlFor="website_hp">Do not fill this field if you are human</label>
                      <input
                        type="text"
                        id="website_hp"
                        name="honeypot"
                        value={formData.honeypot || ''}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name Field */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          disabled={status === 'submitting'}
                          minLength={VALIDATION_LIMITS.name.min}
                          maxLength={VALIDATION_LIMITS.name.max}
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Alex Johnson"
                          className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 transition-colors ${
                            errors.name
                              ? 'border-rose-500 focus-visible:ring-rose-500'
                              : 'border-slate-300 dark:border-slate-800 focus-visible:border-sky-500 focus-visible:ring-sky-500'
                          }`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-rose-500 dark:text-rose-400">{errors.name}</p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          disabled={status === 'submitting'}
                          maxLength={VALIDATION_LIMITS.email.max}
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="alex@example.com"
                          className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 transition-colors ${
                            errors.email
                              ? 'border-rose-500 focus-visible:ring-rose-500'
                              : 'border-slate-300 dark:border-slate-800 focus-visible:border-sky-500 focus-visible:ring-sky-500'
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-rose-500 dark:text-rose-400">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        Subject <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        disabled={status === 'submitting'}
                        minLength={VALIDATION_LIMITS.subject.min}
                        maxLength={VALIDATION_LIMITS.subject.max}
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Senior Software Engineer Position / Technical Collaboration"
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 transition-colors ${
                          errors.subject
                            ? 'border-rose-500 focus-visible:ring-rose-500'
                            : 'border-slate-300 dark:border-slate-800 focus-visible:border-sky-500 focus-visible:ring-sky-500'
                        }`}
                      />
                      {errors.subject && (
                        <p className="mt-1 text-xs text-rose-500 dark:text-rose-400">{errors.subject}</p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="message"
                          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                        >
                          Message <span className="text-rose-500">*</span>
                        </label>
                        <span className="text-[11px] font-mono text-slate-500">
                          {formData.message.length}/{VALIDATION_LIMITS.message.max}
                        </span>
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        disabled={status === 'submitting'}
                        minLength={VALIDATION_LIMITS.message.min}
                        maxLength={VALIDATION_LIMITS.message.max}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe the opportunity, technical challenge, or question you would like to discuss..."
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 transition-colors resize-y ${
                          errors.message
                            ? 'border-rose-500 focus-visible:ring-rose-500'
                            : 'border-slate-300 dark:border-slate-800 focus-visible:border-sky-500 focus-visible:ring-sky-500'
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-rose-500 dark:text-rose-400">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 active:scale-[0.99]"
                    >
                      {status === 'submitting' ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-white" />
                          <span>Delivering Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}

              {/* Hidden sandbox iframe for receiving Google Apps Script redirect response */}
              <iframe
                ref={iframeRef}
                name="hidden_apps_script_iframe"
                title="Google Apps Script Response Frame"
                className="hidden"
                style={{ display: 'none', width: 0, height: 0, border: 'none' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
