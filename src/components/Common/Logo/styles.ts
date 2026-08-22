'use client';
import { styled } from 'styled-components';

/**
 * The lockup's font-size IS the mark's height: every dimension below is in `em`,
 * so setting one number (or overriding it in a media query) scales the whole
 * lockup proportionally.
 */
export const Lockup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3em;
  line-height: 1;
`;

export const Mark = styled.svg<{ $aspect: number }>`
  height: 1em;
  width: ${({ $aspect }) => $aspect}em;
  fill: var(--emerald);
  flex-shrink: 0;
`;

export const WordMark = styled.span`
  color: var(--white);
  font-size: 0.72em;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1;
  white-space: nowrap;
`;
