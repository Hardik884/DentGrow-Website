import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };

export const GlobalStyles = styled.createGlobalStyle`
  :root {
    --Background: #070606;
    --white: #fff;
    --light-gray: #dcdcdc;
    --link-color: #bdbdbd;
    /*
     * Deep Jade. One accent, four steps.
     *
     * --jade is the accent everywhere it is the point: the big statement
     * sections, the primary button, the brand mark. The other three exist only
     * where interaction or contrast forces them, so the site stays black,
     * jade and off-white rather than turning uniformly green.
     *
     * --jade-legible is not a fifth brand colour. Jade at --jade on the
     * near-black ground reaches 3.14:1, which carries a graphic but not a line
     * of small type; the two places jade IS small type use this instead.
     * Contrast for every pairing is recorded in the commit.
     */
    --jade: #176b50; /* accent — white text on it reaches 6.45:1 */
    --jade-hover: #1d8060; /* hover, and focus rings that must clear 3:1 */
    --jade-pressed: #12543e; /* pressed */
    --jade-legible: #229870; /* jade as small text on black — 5.58:1 */
    --jade-tint: #e4f0eb; /* the one inverted surface: the mobile menu's button */
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
    font-family: 'SF Pro Display', sans-serif;
    background-color: var(--Background);
    color: var(--white);
    scroll-snap-type: y mandatory;

    &::-webkit-scrollbar {
      width: 0.5rem;
      border-radius: 0.5rem;
      &-thumb {
        background: var(--link-color);
        border-radius: 0.5rem;
      }

      &-track {
        background: var(--Background);
      }
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .parallax {
    overflow: hidden;
    margin: 0;
    white-space: nowrap;
    display: flex;
    flex-wrap: nowrap;
  }

  .parallax .scroller {
    display: flex;
    white-space: nowrap;
    display: flex;
    flex-wrap: nowrap;
  }

  .scroller span {
    display: block;
    margin-right: 5rem;
  }

  /* Announced by screen readers, never painted. */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .not_complete {
    display: none;
  }

  .complete {
  }
`;
