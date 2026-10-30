import { describe, it, expect } from 'vitest';
import { validateContactForm, sanitizeInput, VALIDATION_LIMITS } from '../src/lib/validation';

describe('Contact Form Validation & Sanitization', () => {
  it('passes with valid inputs', () => {
    const result = validateContactForm({
      name: 'Gautam Taneja',
      email: 'gautam@example.com',
      subject: 'Inquiry regarding Senior Software Engineer Role',
      message: 'Hello Gautam, I would like to discuss an opportunity on our engineering team.',
      honeypot: '',
    });
    expect(result.isValid).toBe(true);
    expect(Object.keys(result.errors).length).toBe(0);
  });

  it('rejects if honeypot field is filled by a bot', () => {
    const result = validateContactForm({
      name: 'Spam Bot',
      email: 'bot@spam.com',
      subject: 'Buy cheap links',
      message: 'Spam promotional content here for testing.',
      honeypot: 'http://spamurl.com',
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.honeypot).toBeDefined();
  });

  it('fails when required fields are empty', () => {
    const result = validateContactForm({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBeDefined();
    expect(result.errors.email).toBeDefined();
    expect(result.errors.subject).toBeDefined();
    expect(result.errors.message).toBeDefined();
  });

  it('fails when email format is invalid', () => {
    const invalidEmails = ['plainaddress', '@missingusername.com', 'user@domain', 'user@.com'];
    for (const email of invalidEmails) {
      const result = validateContactForm({
        name: 'Valid Name',
        email,
        subject: 'Valid Subject Line',
        message: 'This is a sufficiently long test message.',
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBeDefined();
    }
  });

  it('fails when field lengths are below minimums', () => {
    const result = validateContactForm({
      name: 'A',
      email: 'valid@example.com',
      subject: 'Hi',
      message: 'Short',
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toContain(`${VALIDATION_LIMITS.name.min} characters`);
    expect(result.errors.subject).toContain(`${VALIDATION_LIMITS.subject.min} characters`);
    expect(result.errors.message).toContain(`${VALIDATION_LIMITS.message.min} characters`);
  });

  it('sanitizes input by stripping angle brackets and trimming whitespace', () => {
    const unsafe = '   <script>alert("hack")</script>Hello World!   ';
    const clean = sanitizeInput(unsafe);
    expect(clean).not.toContain('<');
    expect(clean).not.toContain('>');
    expect(clean).toBe('scriptalert("hack")/scriptHello World!');
  });
});
