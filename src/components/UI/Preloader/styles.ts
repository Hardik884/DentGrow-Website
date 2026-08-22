'use client';
import { styled } from 'styled-components';

export const Wrapper = styled.div`
  background: var(--Background);
  color: var(--white);
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 9999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const Inner = styled.div`
  display: flex;
  gap: 1em;
  align-items: center;
  padding: 0 2em;
  overflow: hidden;
  /* Sized for an eight-letter word. The original held four letters at 25em,
     which filled the width; "DentGrow" is twice as long, so the type scale and
     the mask height come down proportionally to occupy the same band rather
     than run off the side of the screen. The animation is untouched. */
  height: 10em;

  img {
    width: 12em;
    height: 12em;
  }

  div {
    overflow: hidden;
    display: flex;
    align-items: center;

    div {
      font-weight: 600;
      font-size: 12em;
    }
  }

  @media (max-width: 1200px) {
    img {
      width: 9em;
      height: 9em;
    }

    div {
      div {
        font-size: 9em;
      }
    }
  }

  @media (max-width: 768px) {
    gap: 1rem;
    height: 6rem;
    img {
      width: 3.5rem;
      height: 100%;
    }

    div {
      div {
        font-size: 3.25rem;
      }
    }
  }
`;

export const SecondOverlay = styled.div`
  background: var(--emerald);
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 9990;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
