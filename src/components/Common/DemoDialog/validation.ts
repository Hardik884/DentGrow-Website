/**
 * Validation for the demo request, shared by the form and the route handler.
 *
 * The same rules run in both places on purpose: the client copy exists to give
 * a fast, field-level message, and the server copy exists because the client
 * one can be skipped entirely.
 */

export type DemoRequest = {
  name: string;
  mobile: string;
  email: string;
  message: string;
};

export type DemoErrors = Partial<Record<keyof DemoRequest, string>>;

export const EMPTY_REQUEST: DemoRequest = {
  name: '',
  mobile: '',
  email: '',
  message: '',
};

/**
 * Deliberately permissive: one @, something before it, and a dotted domain
 * after it. Anything stricter starts rejecting addresses that genuinely
 * deliver, and the real proof of an address is that mail arrives at it.
 */
const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

/** Digits, spaces, dashes, brackets and one optional leading +. */
const PHONE_SHAPE = /^\+?[\d\s()-]+$/;

export const MESSAGE_MAX = 1000;

export function validateDemoRequest(values: DemoRequest): DemoErrors {
  const errors: DemoErrors = {};

  const name = values.name.trim();
  if (!name) {
    errors.name = 'Please tell us your name.';
  } else if (name.length < 2) {
    errors.name = 'That looks too short to be a name.';
  } else if (name.length > 80) {
    errors.name = 'Please use 80 characters or fewer.';
  }

  const mobile = values.mobile.trim();
  // Count digits rather than characters: "+91 80 4718 2200" and
  // "08047182200" are both plausible, and both are ten digits or more.
  const digits = mobile.replace(/\D/g, '');
  if (!mobile) {
    errors.mobile = 'Please give us a number we can reach you on.';
  } else if (!PHONE_SHAPE.test(mobile)) {
    errors.mobile = 'Use digits, spaces, brackets, dashes or a leading +.';
  } else if (digits.length < 7 || digits.length > 15) {
    errors.mobile = 'That does not look like a phone number.';
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = 'Please give us an email address.';
  } else if (!EMAIL.test(email)) {
    errors.email = 'Please enter a valid email address.';
  } else if (email.length > 254) {
    errors.email = 'That email address is too long.';
  }

  if (values.message.length > MESSAGE_MAX) {
    errors.message = `Please keep this under ${MESSAGE_MAX} characters.`;
  }

  return errors;
}

export const hasErrors = (errors: DemoErrors) => Object.keys(errors).length > 0;
