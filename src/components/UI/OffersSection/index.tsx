'use client';
import Image from 'next/image';
import {
  Wrapper,
  Inner,
  Header,
  HeaderMainText,
  Offers,
  OfferCard,
  ImageCtn,
  TextCtn,
} from './styles';
import MaskText from '@/components/Common/MaskText';
import { useIsMobile } from '../../../../libs/useIsMobile';
import {
  desktopHeaderPhrases,
  desktopParagraphPhrase,
  eyebrow,
  mobileParagraphPhrase,
  offers,
} from './constants';

const OffersSection = () => {
  const isMobile = useIsMobile();
  return (
    <Wrapper>
      <Inner>
        <Header>
          <h3>{eyebrow}</h3>
          <HeaderMainText>
            <MaskText phrases={desktopHeaderPhrases} tag="h1" />

            {isMobile ? (
              <MaskText phrases={mobileParagraphPhrase} tag="p" />
            ) : (
              <MaskText phrases={desktopParagraphPhrase} tag="p" />
            )}
          </HeaderMainText>
        </Header>
        <Offers>
          {offers.slice(0, 2).map((offer, i) => (
            <OfferCard key={i}>
              <ImageCtn>
                <Image src={offer.illustration} alt={offer.alt} />
              </ImageCtn>
              <TextCtn>
                <MaskText phrases={new Array(offer.title)} tag="h2" />
                <p>{offer.details}</p>
              </TextCtn>
            </OfferCard>
          ))}
        </Offers>
        <Offers>
          {offers.slice(2, 4).map((offer, i) => (
            <OfferCard key={i}>
              <ImageCtn>
                <Image src={offer.illustration} alt={offer.alt} />
              </ImageCtn>
              <TextCtn>
                <MaskText phrases={new Array(offer.title)} tag="h2" />
                <p>{offer.details}</p>
              </TextCtn>
            </OfferCard>
          ))}
        </Offers>
      </Inner>
    </Wrapper>
  );
};

export default OffersSection;
