'use client';
import Image from 'next/image';
import brain_banner from '../../../../public/images/dentgrow/dentgrow-business-brain.png';
import brain_banner_mobile from '../../../../public/images/dentgrow/brain_banner_mobile.png';
import {
  Wrapper,
  Inner,
  Header,
  CardContainer,
  Card,
  TextCtn,
  SVGCtn,
  Stats,
  Stat,
  Areas,
  Area,
  Banner,
} from './styles';
import MaskText from '@/components/Common/MaskText';
import { useIsMobile } from '../../../../libs/useIsMobile';
import {
  areas,
  cardsInfo,
  desktopHeaderPhrase,
  desktopParagraphPhrase,
  mobileHeaderPhrase,
  mobileParagraphPhrase,
  stats,
} from './constants';

const FinancialFuture = () => {
  const isMobile = useIsMobile();

  return (
    <Wrapper>
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
        <CardContainer>
          {cardsInfo.map((info, i) => (
            <Card key={i}>
              <TextCtn>
                <MaskText phrases={new Array(info.title)} tag="h3" />
                <MaskText phrases={new Array(info.details)} tag="p" />
              </TextCtn>
              <SVGCtn>
                <Image src={info.visual} alt={info.alt} />
              </SVGCtn>
            </Card>
          ))}
        </CardContainer>
        <Stats>
          {stats.map((stat, i) => (
            <Stat key={i}>
              <MaskText phrases={new Array(stat.number)} tag="h1" />
              <MaskText phrases={new Array(stat.subtitle)} tag="p" />
            </Stat>
          ))}
        </Stats>
        {/* Names the "areas of the clinic" the row above counts. */}
        <Areas>
          {areas.map((area, i) => (
            <Area key={i}>{area}</Area>
          ))}
        </Areas>
      </Inner>
      <Banner>
        {isMobile ? (
          <Image
            src={brain_banner_mobile}
            alt="DentGrow's daily briefing, showing what needs attention and what to do"
            fill
          />
        ) : (
          <Image
            src={brain_banner}
            alt="DentGrow's daily briefing, showing what needs attention and what to do"
            fill
          />
        )}
      </Banner>
    </Wrapper>
  );
};

export default FinancialFuture;
