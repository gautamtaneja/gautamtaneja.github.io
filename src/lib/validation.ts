export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
  correlationToken?: string;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  honeypot?: string;
}

export const VALIDATION_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 150 },
  subject: { min: 3, max: 200 },
  message: { min: 10, max: 5000 },
};

export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .trim()
    .replace(/[<>]/g, '') // Strip basic angle brackets to prevent simple HTML injection
    .slice(0, 5000);
}

export function validateContactForm(data: ContactFormData): {
  isValid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  // Honeypot check
  if (data.honeypot && data.honeypot.trim() !== '') {
    errors.honeypot = 'Automated submission detected.';
    return { isValid: false, errors };
  }

  // Name validation
  const name = data.name ? data.name.trim() : '';
  if (!name) {
    errors.name = 'Full name is required.';
  } else if (name.length < VALIDATION_LIMITS.name.min) {
    errors.name = `Name must be at least ${VALIDATION_LIMITS.name.min} characters.`;
  } else if (name.length > VALIDATION_LIMITS.name.max) {
    errors.name = `Name cannot exceed ${VALIDATION_LIMITS.name.max} characters.`;
  }

  // Email validation
  const email = data.email ? data.email.trim() : '';
  if (!email) {
    errors.email = 'Email address is required.';
  } else if (email.length > VALIDATION_LIMITS.email.max) {
    errors.email = `Email cannot exceed ${VALIDATION_LIMITS.email.max} characters.`;
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid email address (e.g., name@domain.com).';
  }

  // Subject validation
  const subject = data.subject ? data.subject.trim() : '';
  if (!subject) {
    errors.subject = 'Subject is required.';
  } else if (subject.length < VALIDATION_LIMITS.subject.min) {
    errors.subject = `Subject must be at least ${VALIDATION_LIMITS.subject.min} characters.`;
  } else if (subject.length > VALIDATION_LIMITS.subject.max) {
    errors.subject = `Subject cannot exceed ${VALIDATION_LIMITS.subject.max} characters.`;
  }

  // Message validation
  const message = data.message ? data.message.trim() : '';
  if (!message) {
    errors.message = 'Message is required.';
  } else if (message.length < VALIDATION_LIMITS.message.min) {
    errors.message = `Message must be at least ${VALIDATION_LIMITS.message.min} characters.`;
  } else if (message.length > VALIDATION_LIMITS.message.max) {
    errors.message = `Message cannot exceed ${VALIDATION_LIMITS.message.max} characters.`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

