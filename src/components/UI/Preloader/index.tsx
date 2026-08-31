'use client';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  Wrapper,
  Inner,
  Lockup,
  Mark,
  WordMask,
  Letter,
  SecondOverlay,
} from './styles';
import { MARK_ASPECT } from '@/components/Common/Logo/mark';

const WORD = 'OraMedha'.split('');

/** Nothing may hold the page for longer than this, whatever else happens. */
const FAILSAFE_MS = 3200;

/**
 * The loading screen.
 *
 * One centred OraMedha lockup, then Raft's two-layer wipe into the hero. The
 * mark settles, the wordmark's letters rise out of a mask, and the dark panel
 * lifts to reveal the emerald one, which lifts in turn.
 *
 * Two things it must never do: sit on screen longer than it needs to, and get
 * stuck. The whole sequence runs in about 1.8 seconds, the page is handed over
 * as the first panel starts to lift (so the hero is already mounted behind the
 * green when the green leaves), and a failsafe releases the page even if GSAP
 * never reports completion.
 */
const Preloader = ({
  setComplete,
}: {
  setComplete: Dispatch<SetStateAction<boolean>>;
}) => {
  const letters = useRef<HTMLSpanElement[]>([]);
  const markRef = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const secondOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Guard against the failsafe and the timeline both firing.
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      setComplete(true);
    };

    const failsafe = window.setTimeout(release, FAILSAFE_MS);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (reduce) {
        // No travelling elements and no wipe: the lockup appears, holds long
        // enough to be read as intentional, and the panels cross-fade away.
        gsap.set([markRef.current, letters.current], { opacity: 1, y: 0 });
        tl.to({}, { duration: 0.45 })
          .to(wrapperRef.current, { opacity: 0, duration: 0.35, onStart: release })
          .to(secondOverlayRef.current, { opacity: 0, duration: 0.35 }, '-=0.2');
        return;
      }

      // The wordmark follows the mark almost immediately. Held back any
      // longer, the mark sits alone for half a second and — because the lockup
      // is centred as a whole — reads as though it has been placed off-centre.
      tl.from(markRef.current, {
        opacity: 0,
        scale: 0.86,
        duration: 0.42,
        ease: 'power3.out',
      })
        .from(
          letters.current,
          {
            yPercent: 110,
            duration: 0.45,
            ease: 'power3.out',
            stagger: 0.028,
          },
          '-=0.34'
        )
        // The dark panel lifts first. `release` runs as it starts, so the page
        // mounts while the green panel still covers it — nothing is ever seen
        // reflowing.
        .to(
          wrapperRef.current,
          {
            scaleY: 0,
            transformOrigin: 'top',
            duration: 0.6,
            ease: 'power3.inOut',
            onStart: release,
          },
          '+=0.12'
        )
        .to(
          secondOverlayRef.current,
          {
            scaleY: 0,
            transformOrigin: 'top',
            duration: 0.6,
            ease: 'power3.inOut',
          },
          '-=0.45'
        );
    });

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
    };
  }, [setComplete]);

  return (
    <>
      <Wrapper ref={wrapperRef} aria-hidden="true">
        <Inner>
          <Lockup>
            <Mark ref={markRef} $aspect={MARK_ASPECT} />
            <WordMask>
              {WORD.map((char, i) => (
                <Letter
                  key={i}
                  ref={(element) => {
                    if (element) letters.current[i] = element;
                  }}
                >
                  {char}
                </Letter>
              ))}
            </WordMask>
          </Lockup>
        </Inner>
      </Wrapper>
      <SecondOverlay ref={secondOverlayRef} aria-hidden="true" />
    </>
  );
};

export default Preloader;
