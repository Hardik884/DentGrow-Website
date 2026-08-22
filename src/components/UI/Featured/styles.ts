'use client';
import { motion } from 'framer-motion';
import { styled } from 'styled-components';

export const Wrapper = styled.section``;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 6.25rem auto 0;
  max-width: 1440px;
  width: 90%;

  h2 {
    color: var(--link-color);
    font-size: 1.25rem;
    font-weight: 500;
    text-transform: uppercase;
    margin-top: 6.5rem;
  }

  @media (max-width: 768px) {
    margin-top: 5rem;

    h2 {
      font-size: 1rem;
      font-weight: 500;
      margin-top: 3.75rem;
    }
  }
`;

export const ImageContainer = styled.div`
  max-width: 85rem;
  margin: 0 auto;
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 0.75rem;

  img {
    object-fit: cover;
    /* The banner is a screenshot, not a photo: anchor the crop to the top-left
       so the product's navigation and page header stay in frame at every width,
       instead of the centre-crop a photograph wants. */
    object-position: left top;
    border-radius: 0.75rem;
  }

  @media (max-width: 768px) {
    border-radius: 0.5rem;

    img {
      height: 23.75rem;
    }
  }
`;

export const ParallaxImages = styled.div`
  position: relative;
  max-width: 53.7rem;
  margin: 3rem auto 0;
`;

/* One entry in the scrolling list of connected clinic areas. Sits in the slot
   the press-logo strip used to occupy, and keeps its rhythm. */
export const MarqueeItem = styled.span`
  /* Doubled selector: the global \`.scroller span\` rule that lays out the
     marquee's four repeats is more specific than a single generated class, and
     would otherwise force each item to \`display: block\` and stack them. */
  && {
    display: inline-block;
    margin-right: 3rem;
    color: var(--link-color);
    font-size: 1.5rem;
    font-weight: 400;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    && {
      margin-right: 2rem;
      font-size: 1.125rem;
    }
  }
`;

export const Div = styled(motion.div)`
  position: relative;
  height: 35rem;
  overflow: hidden;

  @media (max-width: 599px) {
    height: 23.75rem;
    
     img {
      object-fit: cover;
     }
  }
`;
