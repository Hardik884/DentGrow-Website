'use client';
import Image from 'next/image';
import { styled } from 'styled-components';

export const Wrapper = styled.section`
  padding-top: 7.5rem;

  @media (max-width: 768px) {
    padding-top: 6rem;
  }
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 1440px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 56rem;
  margin: 0 auto 7.38rem;

  h3 {
    color: var(--jade-legible);
    font-size: 1.125rem;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 4.75rem;
    font-weight: 400;
  }

  p {
    max-width: 41.75rem;
    color: var(--link-color);
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.75rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.25rem;
    }

    p {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
`;

export const HeaderMainText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 7.77rem;
  width: 100%;

  /*
   * Below the breakpoint the fan becomes a stack.
   *
   * The fan is a hover interaction: the two outer panels sit folded behind the
   * centre one and only swing out when the centre card is hovered. Touch has no
   * hover, so on a phone two thirds of this section's content could not be
   * reached at all. Stacking them keeps every panel visible without asking for
   * a gesture the device cannot make.
   */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 4.5rem;
  }
`;

/* Shared by the two outer panels: static, full-width and unrotated once the
   fan is a stack, whether or not the hover class happens to be set. */
const stackedOnMobile = `
  @media (max-width: 768px) {
    &,
    &.active {
      position: relative;
      top: auto;
      width: 100%;
      height: auto;
      transform: none;
    }
  }
`;

export const LeftImage = styled(Image)`
  /* Folded flat behind the centre card until it is hovered, as designed.
     A resting offset was tried so the fan would advertise itself, and backed
     out: these panels are screenshots, and a screenshot standing on its side
     reads as broken UI rather than as the edge of a stacked card. */
  transform: rotate(270deg);
  position: absolute;
  top: 64px;
  transition: transform 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);

  &.active {
    transform: rotate(70.281deg) translate(-50%, 60%);
    top: 60%;
  }

  ${stackedOnMobile}
`;

export const MiddleImage = styled(Image)`
  position: relative;
  z-index: 3;
  cursor: pointer;

  @media (max-width: 768px) {
    cursor: default;
    width: 100%;
    height: auto;
  }
`;

export const RightImage = styled(Image)`
  width: 21.875rem;
  height: 13.875rem;
  transform: rotate(90deg);
  top: 65px;
  position: absolute;
  transition: transform 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);

  &.active {
    transform: rotate(-70.281deg) translate(50%, 60%);
    top: 60%;
  }

  ${stackedOnMobile}
`;
