'use client';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { Edge, Edges, Title } from '../FinancialFreedom/styles';
import panel_right from '../../../../public/images/product/panel_right.png';
import {
  Wrapper,
  Inner,
  Header,
  HeaderMainText,
  Showcase,
  PrimaryPanel,
} from './styles';
import { MaskText } from '@/components';
import { useIsMobile } from '../../../../libs/useIsMobile';
import {
  desktopHeaderPhrase,
  desktopParagraphPhrase,
  edges,
  mobileHeaderPhrase,
  mobileParagraphPhrase,
} from './constants';

const IntroSection = () => {
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();

  /*
   * One movement, once: the composition fades up into place and then holds.
   *
   * It replaced a hover-driven fan that unfolded three rotated panels — an
   * effect the reader had to find, that a touch device could never trigger,
   * and that drew attention to itself rather than to the product. A single
   * short rise reads as the section settling, which is all it needs to do.
   *
   * Under prefers-reduced-motion the travel is dropped entirely and only the
   * fade remains, so nothing on screen moves.
   *
   * `y` is declared in both cases rather than omitted from the reduced one.
   * useReducedMotion resolves after the first render, so the initial pass can
   * still lay the panel down 24px low; a variant that then never mentions `y`
   * gives framer-motion nothing to animate back, and the composition settles
   * permanently off-position. Naming it 0 corrects that on the same pass.
   */
  const travel = reduceMotion ? 0 : 24;
  const showcaseReveal = {
    hidden: { opacity: 0, y: travel },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0.25, ease: 'linear' }
        : { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Wrapper>
      <Inner>
        <Header>
          <h3>Operations</h3>
          <HeaderMainText>
            {isMobile ? (
              <>
                <MaskText phrases={mobileHeaderPhrase} tag="h1" />
                <MaskText phrases={mobileParagraphPhrase} tag="p" />
              </>
            ) : (
              <>
                <MaskText phrases={desktopHeaderPhrase} tag="h1" />
                <MaskText phrases={desktopParagraphPhrase} tag="p" />
              </>
            )}
          </HeaderMainText>
        </Header>
        {/*
          One panel, at every width. A figures tile and a navigation tile used
          to sit under it as a supporting pair; they carried nothing the copy
          below doesn't already say, so the day's schedule stands on its own.
        */}
        <Showcase
          variants={showcaseReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <PrimaryPanel>
            <Image
              src={panel_right}
              alt="Today's appointments in OraMedha, with the treating doctor, time and status for each"
              sizes="(max-width: 768px) 90vw, 44rem"
            />
          </PrimaryPanel>
        </Showcase>
        <Edges>
          {edges.map((edge, i) => (
            <Edge key={i}>
              <Title>
                <Image src={edge.icon} alt="" aria-hidden />
                <MaskText phrases={new Array(edge.point)} tag="h3" />
              </Title>
              <MaskText phrases={new Array(edge.details)} tag="p" />
            </Edge>
          ))}
        </Edges>
      </Inner>
    </Wrapper>
  );
};

export default IntroSection;
