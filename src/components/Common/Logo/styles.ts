'use client';
import { styled } from 'styled-components';

/**
 * The lockup's font-size IS the mark's height: every dimension below is in `em`,
 * so setting one number (or overriding it in a media query) scales the whole
 * lockup proportionally.
 */
export const Lockup = styled.div.withConfig({ componentId: 'dg-logo-lockup' })`
  display: flex;
  align-items: center;
  gap: 0.3em;
  line-height: 1;
`;

/**
 * Component ids are pinned.
 *
 * styled-components derives an id from the order components are created in
 * unless a build-time transform names them, and Next's SWC transform does not
 * reach plain .ts files. Two identically-shaped `Mark` components — this one
 * and the loading screen's — were created in a different order on the server
 * than in the client bundle, so their ids swapped and React reported a
 * hydration mismatch on every load. Naming them takes the ordering out of it.
 */
export const Mark = styled.svg.withConfig({
  componentId: 'dg-logo-mark',
})<{ $aspect: number }>`
  height: 1em;
  width: ${({ $aspect }) => $aspect}em;
  fill: var(--jade);
  flex-shrink: 0;
`;

export const WordMark = styled.span.withConfig({ componentId: 'dg-logo-word' })`
  color: var(--white);
  font-size: 0.72em;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1;
  white-space: nowrap;
`;
