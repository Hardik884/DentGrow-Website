'use client';
import { Lockup, Mark, WordMark } from './styles';
import { MARK_ASPECT } from './mark';

/**
 * The OraMedha lockup — the product's own mark plus the wordmark.
 *
 * The wordmark is live text so it uses the page font, and the mark is painted
 * through a CSS mask so it inherits colour from CSS — the same two properties
 * the previous inline-SVG version had, with the mark now sourced from the app's
 * raster artwork instead of a traced path.
 *
 * `size` is the mark's HEIGHT in px and is applied as the lockup's font-size;
 * everything inside is expressed in `em`. That means a call site can also
 * rescale the whole lockup at a breakpoint by overriding `font-size`, without
 * needing a second size prop threaded through.
 */
const Logo = ({ size = 29 }: { size?: number }) => (
  <Lockup style={{ fontSize: `${size}px` }} role="img" aria-label="OraMedha">
    <Mark $aspect={MARK_ASPECT} aria-hidden="true" />
    <WordMark>OraMedha</WordMark>
  </Lockup>
);

export default Logo;
