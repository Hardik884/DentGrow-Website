'use client';
import { motion } from 'framer-motion';
import { styled } from 'styled-components';

export const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9500;
  background: rgba(7, 6, 6, 0.72);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.25rem;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 1rem;
    align-items: flex-start;
  }
`;

/* The card uses the section-card treatment from the rest of the page: the same
   #131313 surface, the same hairline border and the same 0.75rem radius. */
export const Panel = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 34rem;
  border-radius: 0.75rem;
  border: 1px solid var(--stroke, rgba(255, 255, 255, 0.08));
  background: #131313;
  padding: 2.5rem;
  margin: auto;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 2.25rem;
  height: 2.25rem;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  background: transparent;
  color: var(--link-color);
  font-size: 1.125rem;
  line-height: 1;
  cursor: pointer;
  transition: color 0.25s ease, border-color 0.25s ease;

  &:hover {
    color: var(--white);
    border-color: rgba(255, 255, 255, 0.32);
  }

  &:focus-visible {
    outline: 2px solid var(--jade-hover);
    outline-offset: 2px;
  }
`;

export const Header = styled.header`
  margin-bottom: 2rem;
  padding-right: 2.5rem;

  h2 {
    font-size: 2rem;
    font-weight: 400;
    line-height: 1.15;
    margin-bottom: 0.75rem;
  }

  p {
    color: var(--link-color);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;

    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.9375rem;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    color: var(--white);
    font-size: 0.9375rem;
    font-weight: 500;
  }

  /* The asterisk is decorative: the fields carry the required attribute and
     aria-required, so assistive tech does not depend on reading a glyph. */
  label span {
    color: var(--jade-legible);
    margin-left: 0.125rem;
  }
`;

/* "(optional)" is the opposite of a required marker, so it must not share the
   asterisk's jade. It recedes instead. */
export const Optional = styled.span`
  && {
    color: var(--link-color);
    font-weight: 400;
  }
`;

const control = `
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.03);
  color: var(--white);
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  padding: 0.75rem 0.875rem;
  transition: border-color 0.2s ease, background 0.2s ease;

  &::placeholder {
    color: #6b6b6b;
  }

  &:hover:not(:disabled) {
    border-color: rgba(255, 255, 255, 0.24);
  }

  &:focus {
    outline: none;
    border-color: var(--jade-hover);
    background: rgba(255, 255, 255, 0.05);
  }

  &[aria-invalid='true'] {
    border-color: #ff6b6b;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  ${control}
`;

export const TextArea = styled.textarea`
  ${control}
  min-height: 6.5rem;
  resize: vertical;
`;

export const FieldError = styled.p`
  color: #ff8f8f;
  font-size: 0.875rem;
  font-weight: 400;
`;

export const Submit = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border: none;
  border-radius: 6.25rem;
  background: var(--jade);
  color: var(--white);
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.875rem 2rem;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: background 0.25s ease, opacity 0.25s ease;

  &:hover:not(:disabled) {
    background: var(--jade-hover);
  }

  &:active:not(:disabled) {
    background: var(--jade-pressed);
  }

  &:focus-visible {
    outline: 2px solid var(--jade-hover);
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: progress;
  }
`;

/* Borrows the preloader's language: a mark that turns, rather than a spinner. */
export const Spinner = styled.span`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: var(--white);
  animation: demo-spin 0.7s linear infinite;

  @keyframes demo-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 2s;
  }
`;

export const FormError = styled.p`
  color: #ff8f8f;
  font-size: 0.9375rem;
  line-height: 1.4rem;
  border: 1px solid rgba(255, 107, 107, 0.35);
  background: rgba(255, 107, 107, 0.08);
  border-radius: 0.5rem;
  padding: 0.75rem 0.875rem;
`;

export const Success = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;

  h2 {
    font-size: 2rem;
    font-weight: 400;
    line-height: 1.15;
  }

  p {
    color: var(--link-color);
    font-size: 1rem;
    line-height: 1.5rem;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.5rem;
    }
  }
`;

export const SuccessMark = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--jade);
  color: var(--white);
  font-size: 1.375rem;
  font-weight: 600;
`;

export const Done = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 6.25rem;
  background: transparent;
  color: var(--white);
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.75rem 1.75rem;
  cursor: pointer;
  transition: border-color 0.25s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
  }

  &:focus-visible {
    outline: 2px solid var(--jade-hover);
    outline-offset: 3px;
  }
`;
