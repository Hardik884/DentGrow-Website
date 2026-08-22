'use client';
import { Body, LineMask } from './styles';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';

const MaskText = ({ phrases, tag }: { phrases: string[]; tag: string }) => {
  const animate = {
    initial: {
      y: '100%',
    },
    open: (i: number) => ({
      y: '0%',
      transition: { duration: 1, delay: 0.1 * i, ease: [0.33, 1, 0.68, 1] },
    }),
  };
  const body = useRef(null);
  // The root margin is deliberately vertical-only. A bare '-10%' also shrinks
  // the viewport horizontally, which never mattered for a reveal driven by
  // scrolling but does hide narrow text that sits near the left or right edge
  // of a full-width row — a one-character stat at the end of the stats row
  // falls entirely outside the shrunken box and never animates in. Restricting
  // the inset to the vertical axis leaves the scroll timing exactly as it was.
  const isInView = useInView(body, {
    once: true,
    margin: '-10% 0px',
    amount: 0.4,
  });
  return (
    <Body ref={body}>
      {phrases.map((phrase, index) => {
        return (
          <LineMask key={index}>
            {tag === 'h1' ? (
              <motion.h1
                variants={animate}
                initial="initial"
                animate={isInView ? 'open' : ''}
                custom={index}
              >
                {phrase}
              </motion.h1>
            ) : tag === 'h2' ? (
              <motion.h2
                variants={animate}
                initial="initial"
                animate={isInView ? 'open' : ''}
                custom={index}
              >
                {phrase}
              </motion.h2>
            ) : tag === 'h3' ? (
              <motion.h3
                variants={animate}
                initial="initial"
                animate={isInView ? 'open' : ''}
                custom={index}
              >
                {phrase}
              </motion.h3>
            ) : (
              <motion.p
                variants={animate}
                initial="initial"
                animate={isInView ? 'open' : ''}
                custom={index}
              >
                {phrase}
              </motion.p>
            )}
          </LineMask>
        );
      })}
    </Body>
  );
};

export default MaskText;
