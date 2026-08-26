'use client';
import Image from 'next/image';
import {
  Wrapper,
  Inner,
  Header,
  BannerCtn,
  Edges,
  Edge,
  Title,
  BriefNote,
} from './styles';
import MaskText from '@/components/Common/MaskText';
import RevealCover from '@/components/Common/RevealCover';
import { Div } from '../Featured/styles';
import { imageVariants } from '../Featured';
import { useIsMobile } from '../../../../libs/useIsMobile';
import clinical_banner from '../../../../public/images/dentgrow/dentgrow-clinical-workflow.png';
import clinical_banner_mobile from '../../../../public/images/dentgrow/clinical_banner_mobile.png';
import { SECTION_IDS } from '../../../../libs/useScrollToSection';
import {
  desktopBriefNotePhrase,
  desktopHeaderPhrase,
  desktopParagraphPhrase,
  edges,
  mobileBriefNotePhrase,
  mobileHeaderPhrase,
  mobileParagraphPhrase,
} from './constants';

const FinancialFreedom = () => {
  const isMobile = useIsMobile();

  return (
    <Wrapper id={SECTION_IDS.solutions}>
      <Inner>
        <Header>
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
        </Header>
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
                src={clinical_banner_mobile}
                alt="A patient's record and dental chart in OraMedha"
                fill
              />
            ) : (
              <Image
                src={clinical_banner}
                alt="A patient's record and dental chart in OraMedha"
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
      <BriefNote>
        {isMobile ? (
          <MaskText phrases={mobileBriefNotePhrase} tag="p" />
        ) : (
          <MaskText phrases={desktopBriefNotePhrase} tag="p" />
        )}
      </BriefNote>
    </Wrapper>
  );
};

export default FinancialFreedom;
