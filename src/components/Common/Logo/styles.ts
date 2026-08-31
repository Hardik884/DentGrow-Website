'use client';
import { styled } from 'styled-components';
import { MARK_SRC } from './mark';

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
 * The mark: a span painted through a CSS mask, not an <svg>.
 *
 * The artwork is a raster whose alpha channel is the shape, so the colour comes
 * from `background-color` and the mask supplies the outline. That keeps the mark
 * recolourable from CSS exactly as the previous inline path was — which matters
 * here, because the mark has to be white on this site's near-black ground and
 * near-black anywhere it is ever put on a light one.
 *
 * WHITE, not --jade. The mark used to be painted --jade (#176b50), which this
 * file's own token comments record as reaching only 3.14:1 against the
 * --Background ground — enough for a graphic, but the weakest thing in the
 * lockup, sitting directly beside a --white wordmark. White takes the mark to
 * 21:1 and makes the two halves of the lockup one object instead of two colours.
 *
 * Component ids are pinned.
 *   styled-components derives an id from the order components are created in
 *   unless a build-time transform names them, and Next's SWC transform does not
 *   reach plain .ts files. Two identically-shaped `Mark` components — this one
 *   and the loading screen's — were created in a different order on the server
 *   than in the client bundle, so their ids swapped and React reported a
 *   hydration mismatch on every load. Naming them takes the ordering out of it.
 */
export const Mark = styled.span.withConfig({
  componentId: 'dg-logo-mark',
})<{ $aspect: number }>`
  display: block;
  height: 1em;
  width: ${({ $aspect }) => $aspect}em;
  flex-shrink: 0;
  background-color: var(--white);
  /* -webkit- first for older Safari, which shipped the prefixed property years
     before the standard one. */
  -webkit-mask-image: url('${MARK_SRC}');
  mask-image: url('${MARK_SRC}');
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  /* contain, not cover: the mark must never be cropped, and its box is
     already set to the asset's own aspect ratio. */
  -webkit-mask-size: contain;
  mask-size: contain;
`;

export const WordMark = styled.span.withConfig({ componentId: 'dg-logo-word' })`
  color: var(--white);
  font-size: 0.72em;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1;
  white-space: nowrap;
`;
