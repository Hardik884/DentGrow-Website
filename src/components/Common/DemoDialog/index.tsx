'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLenis } from '@studio-freight/react-lenis';
import { useDemoDialog } from './context';
import {
  EMPTY_REQUEST,
  MESSAGE_MAX,
  hasErrors,
  validateDemoRequest,
  type DemoErrors,
  type DemoRequest,
} from './validation';
import {
  Overlay,
  Panel,
  CloseButton,
  Header,
  Form,
  Field,
  Input,
  TextArea,
  FieldError,
  Optional,
  Submit,
  Spinner,
  FormError,
  Success,
  SuccessMark,
  Done,
} from './styles';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * The demo request form.
 *
 * One dialog for the whole site — the header, hero and footer buttons all open
 * this. It reports success only when the request was actually accepted by
 * /api/demo-request; a failed or unconfigured delivery shows the error state.
 */
const DemoDialog = () => {
  const { isOpen, close } = useDemoDialog();
  const lenis = useLenis();

  const [values, setValues] = useState<DemoRequest>(EMPTY_REQUEST);
  const [errors, setErrors] = useState<DemoErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [submitted, setSubmitted] = useState(false);

  /*
   * Guards against a second submission while the first is in the air.
   * `status` alone is not enough: it is React state, so two clicks landing in
   * the same tick both read the pre-update value and both POST. A ref flips
   * synchronously, so the second click sees it immediately.
   */
  const inFlight = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<Element | null>(null);
  const ids = useId();

  const fieldId = (name: string) => `${ids}-${name}`;
  const errorId = (name: string) => `${ids}-${name}-error`;

  // Freeze the page behind the dialog. Lenis drives the scroll, so stopping it
  // is what actually holds the background still; the body rule catches the
  // native scroll that remains on touch devices.
  useEffect(() => {
    if (!isOpen) return;

    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      lenis?.start();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, lenis]);

  // Remember what opened the dialog so focus can go back there on close.
  useEffect(() => {
    if (isOpen) {
      openerRef.current = document.activeElement;
      // Wait for the entry animation to mount the field before focusing it.
      const id = window.setTimeout(() => firstFieldRef.current?.focus(), 60);
      return () => window.clearTimeout(id);
    }

    const opener = openerRef.current as HTMLElement | null;
    opener?.focus?.();
  }, [isOpen]);

  // Escape closes; Tab is trapped inside the panel.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        close();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [isOpen, close]);

  // Start each visit from a clean form once the closing animation is done.
  useEffect(() => {
    if (isOpen) return;
    const id = window.setTimeout(() => {
      setValues(EMPTY_REQUEST);
      setErrors({});
      setStatus('idle');
      setSubmitted(false);
      inFlight.current = false;
    }, 300);
    return () => window.clearTimeout(id);
  }, [isOpen]);

  const update = (name: keyof DemoRequest) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const next = { ...values, [name]: event.target.value };
    setValues(next);
    // Re-validate live only after a failed submit, so the first pass through
    // the form is not shouting at fields the visitor is still filling in.
    if (submitted) setErrors(validateDemoRequest(next));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (inFlight.current) return;
    setSubmitted(true);

    const found = validateDemoRequest(values);
    setErrors(found);

    if (hasErrors(found)) {
      const firstInvalid = (['name', 'mobile', 'email', 'message'] as const).find(
        (key) => found[key]
      );
      if (firstInvalid) {
        document.getElementById(fieldId(firstInvalid))?.focus();
      }
      return;
    }

    inFlight.current = true;
    setStatus('submitting');
    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      // Success is reported only for a 200, which the server sends only after
      // Google has confirmed the row.
      setStatus(response.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    } finally {
      inFlight.current = false;
    }
  };

  const busy = status === 'submitting';

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <Panel
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={fieldId('title')}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
          >
            <CloseButton type="button" onClick={close} aria-label="Close">
              &#215;
            </CloseButton>

            {status === 'success' ? (
              <Success>
                <SuccessMark aria-hidden="true">&#10003;</SuccessMark>
                <h2 id={fieldId('title')}>Request received</h2>
                <p>Thanks — we&rsquo;ll be in touch shortly.</p>
                <Done type="button" onClick={close}>
                  Close
                </Done>
              </Success>
            ) : (
              <>
                <Header>
                  <h2 id={fieldId('title')}>Book a demo</h2>
                  <p>
                    Tell us how to reach you and we&rsquo;ll arrange a walkthrough
                    of OraMedha with your clinic.
                  </p>
                </Header>

                <Form onSubmit={onSubmit} noValidate>
                  <Field>
                    <label htmlFor={fieldId('name')}>
                      Name <span aria-hidden="true">*</span>
                    </label>
                    <Input
                      id={fieldId('name')}
                      ref={firstFieldRef}
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Dr. Ananya Mehta"
                      value={values.name}
                      onChange={update('name')}
                      disabled={busy}
                      required
                      aria-required="true"
                      aria-invalid={errors.name ? 'true' : undefined}
                      aria-describedby={errors.name ? errorId('name') : undefined}
                    />
                    {errors.name && (
                      <FieldError id={errorId('name')}>{errors.name}</FieldError>
                    )}
                  </Field>

                  <Field>
                    <label htmlFor={fieldId('mobile')}>
                      Mobile number <span aria-hidden="true">*</span>
                    </label>
                    <Input
                      id={fieldId('mobile')}
                      name="mobile"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+91 80 4718 2200"
                      value={values.mobile}
                      onChange={update('mobile')}
                      disabled={busy}
                      required
                      aria-required="true"
                      aria-invalid={errors.mobile ? 'true' : undefined}
                      aria-describedby={
                        errors.mobile ? errorId('mobile') : undefined
                      }
                    />
                    {errors.mobile && (
                      <FieldError id={errorId('mobile')}>
                        {errors.mobile}
                      </FieldError>
                    )}
                  </Field>

                  <Field>
                    <label htmlFor={fieldId('email')}>
                      Email address <span aria-hidden="true">*</span>
                    </label>
                    <Input
                      id={fieldId('email')}
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@yourclinic.com"
                      value={values.email}
                      onChange={update('email')}
                      disabled={busy}
                      required
                      aria-required="true"
                      aria-invalid={errors.email ? 'true' : undefined}
                      aria-describedby={
                        errors.email ? errorId('email') : undefined
                      }
                    />
                    {errors.email && (
                      <FieldError id={errorId('email')}>{errors.email}</FieldError>
                    )}
                  </Field>

                  <Field>
                    <label htmlFor={fieldId('message')}>
                      Message <Optional>(optional)</Optional>
                    </label>
                    <TextArea
                      id={fieldId('message')}
                      name="message"
                      rows={4}
                      maxLength={MESSAGE_MAX}
                      placeholder="How many chairs does your clinic run? Anything you'd like us to cover?"
                      value={values.message}
                      onChange={update('message')}
                      disabled={busy}
                      aria-invalid={errors.message ? 'true' : undefined}
                      aria-describedby={
                        errors.message ? errorId('message') : undefined
                      }
                    />
                    {errors.message && (
                      <FieldError id={errorId('message')}>
                        {errors.message}
                      </FieldError>
                    )}
                  </Field>

                  {status === 'error' && (
                    <FormError role="alert">
                      We couldn&rsquo;t send that just now. Please try again, or
                      email us directly and we&rsquo;ll pick it up.
                    </FormError>
                  )}

                  <Submit type="submit" disabled={busy}>
                    {busy && <Spinner aria-hidden="true" />}
                    {busy ? 'Sending' : 'Request a demo'}
                  </Submit>

                  <p aria-live="polite" className="sr-only">
                    {busy ? 'Sending your request' : ''}
                  </p>
                </Form>
              </>
            )}
          </Panel>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default DemoDialog;
