/**
 * The OraMedha mark.
 *
 * Copied from the OraMedha application's own `lib/brand/mark.ts`. The marketing
 * site must show the same mark the product does, so this mirrors that file
 * rather than being a separate drawing — if the artwork changes, re-copy it from
 * the application.
 *
 * The mark is a raster asset, not a path. It is an all-black PNG whose ALPHA
 * channel carries the shape, generated from the supplied artwork by the app's
 * `brand/make-mark.mjs`. Components paint it with `background-color` through a
 * CSS mask, so the single asset takes whatever colour the surface needs — white
 * on this site's near-black ground, and near-black on a light one.
 *
 * The previous mark was a traced SVG path (`MARK_PATH`). That artwork is retired;
 * nothing here should reintroduce a path export.
 */

/** The mark asset, served from `public/`. */
export const MARK_SRC = '/brand/oramedha-mark.png';

/**
 * Width divided by height. Callers multiply their height by this.
 *
 * 238/117 from the asset — a wide mark, roughly 2:1, where the previous one was
 * nearly square at 1.24:1. Any layout that assumed a squarish logo needs
 * checking against this.
 */
export const MARK_ASPECT = 238 / 117;
