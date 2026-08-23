'use client';
import { motion } from 'framer-motion';
import { styled } from 'styled-components';

/**
 * The link itself. An anchor rather than a div: these now point at real
 * sections, so they must be focusable and behave like links.
 */
export const Anchor = styled(motion.a)`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-decoration: none;

  &:focus-visible {
    outline: 2px solid var(--jade-hover);
    outline-offset: 4px;
    border-radius: 2px;
  }
`;

export const Word = styled(motion.span)`
  white-space: nowrap;
  position: relative;
`;

export const Span = styled(motion.span)`
  position: relative;
  display: inline-block;
  white-space: nowrap;
  color: var(--link-color);
  font-size: 1rem;
  font-weight: 400;

  /* The mobile panel behind these is jade, so the links are white on it
     rather than the near-black they were on the old bright green. */
  @media (max-width: 768px) {
    color: var(--white);
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

export const AbsoluteContainer = styled.div`
  position: absolute;
  top: 0;
`;
