'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate as animateValue } from 'framer-motion';
import { Body, LineMask } from '../MaskText/styles';
import { prefersReducedMotion } from '../../../../libs/useScrollToSection';

const reveal = {
  initial: { y: '100%' },
  open: { y: '0%', transition: { duration: 1, ease: [0.33, 1, 0.68, 1] } },
};

/**
 * A stat's headline number.
 *
 * Same line-mask reveal as MaskText, so it still enters with the rest of the
 * section, but the digits themselves count up from 0 to the real value once
 * the stat scrolls into view rather than just fading in already-finished —
 * echoing the kind of number the product itself counts up in the daily
 * briefing. Counts once: `useInView`'s `once: true` and the `hasStarted` ref
 * both stop it from restarting on a later scroll past the section.
 *
 * A value that isn't a plain number (there isn't one on this page today, but
 * a future stat might carry a "+" or similar) is rendered as-is, unanimated.
 */
const AnimatedNumber = ({ value }: { value: string }) => {
  const target = parseFloat(value);
  const isNumeric = !Number.isNaN(target) && `${target}` === value;

  const [display, setDisplay] = useState(isNumeric ? '0' : value);
  const body = useRef(null);
  const isInView = useInView(body, {
    once: true,
    margin: '-10% 0px',
    amount: 0.4,
  });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current || !isNumeric) return;
    hasStarted.current = true;

    if (prefersReducedMotion()) {
      setDisplay(value);
      return;
    }

    const controls = animateValue(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    });

    return () => controls.stop();
  }, [isInView, isNumeric, target, value]);

  return (
    <Body ref={body}>
      <LineMask>
        <motion.h1
          variants={reveal}
          initial="initial"
          animate={isInView ? 'open' : ''}
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {display}
        </motion.h1>
      </LineMask>
    </Body>
  );
};

export default AnimatedNumber;
