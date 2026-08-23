'use client';
import { styled } from 'styled-components';

/**
 * Was an anchor when it pointed nowhere; it opens a dialog now, so it is a
 * button. The visual treatment is unchanged — same pill, same green, same
 * weight — because the padding is still passed in per call site.
 */
export const Trigger = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 6.25rem;
  background: var(--green);
  color: var(--white);
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s ease, color 0.25s ease;

  &:hover {
    background: var(--emerald);
    color: var(--Background);
  }

  &:focus-visible {
    outline: 2px solid var(--emerald);
    outline-offset: 3px;
  }
`;
