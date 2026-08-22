'use client';
import { Lockup, Mark, WordMark } from './styles';
import { MARK_ASPECT, MARK_PATH, MARK_VIEWBOX } from './mark';

/**
 * The DentGrow lockup — the product's own mark plus the wordmark.
 *
 * Rendered inline rather than as an <img> so the wordmark uses the page font
 * and the mark inherits colour from CSS, the way the logo it replaces did.
 *
 * `size` is the mark's HEIGHT in px and is applied as the lockup's font-size;
 * everything inside is expressed in `em`. That means a call site can also
 * rescale the whole lockup at a breakpoint by overriding `font-size`, without
 * needing a second size prop threaded through.
 */
const Logo = ({ size = 29 }: { size?: number }) => (
  <Lockup style={{ fontSize: `${size}px` }}>
    <Mark
      viewBox={MARK_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      $aspect={MARK_ASPECT}
    >
      <path d={MARK_PATH} fillRule="evenodd" clipRule="evenodd" />
    </Mark>
    <WordMark>DentGrow</WordMark>
  </Lockup>
);

export default Logo;
