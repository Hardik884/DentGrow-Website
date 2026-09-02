'use client';
import Image from 'next/image';
import RevealCover from '@/components/Common/RevealCover';
import { Div } from '../Featured/styles';
import { imageVariants } from '../Featured';
import { Edge, Edges, Title } from '../FinancialFreedom/styles';
import appointments_workspace from '../../../../public/images/product/appointments-workspace.png';
import appointments_banner_mobile from '../../../../public/images/product/appointments_banner_mobile.png';
import {
  Wrapper,
  Inner,
  Header,
  HeaderMainText,
  BannerCtn,
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
          The same banner treatment as the two screenshots above it: one
          full-width frame, RevealCover over it, and Featured's scale-down
          reveal. It previously had a bespoke fade-and-rise inside a 44rem
          panel, which made the one screen this section is actually about the
          smallest and least legible on the page.
        */}
        <BannerCtn>
          <RevealCover />
          <Div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.25, once: true }}
          >
            {isMobile ? (
              <Image
                src={appointments_banner_mobile}
                alt="Today's appointments in OraMedha, with the treating doctor, time and status for each"
                fill
              />
            ) : (
              <Image
                src={appointments_workspace}
                alt="Today's appointments in OraMedha, with the treating doctor, time and status for each"
                fill
              />
            )}
          </Div>
        </BannerCtn>
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
