'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Edge, Edges, Title } from '../FinancialFreedom/styles';
import panel_centre from '../../../../public/images/product/panel_centre.png';
import panel_left from '../../../../public/images/product/panel_left.png';
import panel_right from '../../../../public/images/product/panel_right.png';
import {
  Wrapper,
  Inner,
  Header,
  HeaderMainText,
  CardsContainer,
  LeftImage,
  MiddleImage,
  RightImage,
  MobilePanels,
  PrimaryPanel,
  SecondaryPanel,
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
  const [isHovered, setIsHovered] = useState<boolean>(false);

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
          Two compositions of the same three panels, one per layout.

          The fan below is driven by hovering the centre card, which a phone
          cannot do, so the breakpoint picks between them rather than trying to
          reflow one into the other — the desktop markup is untouched, and the
          phone gets a composition built for it: the day's appointments leading,
          the figures and the workflow as a compact pair underneath.
        */}
        {isMobile ? (
          <MobilePanels>
            <PrimaryPanel>
              <Image src={panel_right} alt="Today's appointments in OraMedha" />
            </PrimaryPanel>
            <SecondaryPanel>
              <Image src={panel_left} alt="Today's numbers in OraMedha" />
            </SecondaryPanel>
            <SecondaryPanel>
              <Image src={panel_centre} alt="OraMedha's navigation" />
            </SecondaryPanel>
          </MobilePanels>
        ) : (
          <CardsContainer>
            <LeftImage
              className={isHovered ? 'active' : ''}
              src={panel_left}
              alt="Today's numbers in OraMedha"
            />
            <MiddleImage
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              src={panel_centre}
              alt="OraMedha's navigation"
            />
            <RightImage
              className={isHovered ? 'active' : ''}
              src={panel_right}
              alt="Today's appointments in OraMedha"
            />
          </CardsContainer>
        )}
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
