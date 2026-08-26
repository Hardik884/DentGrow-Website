'use client';
import { Wrapper, Inner, Header, HeaderMainText } from './styles';
import MaskText from '@/components/Common/MaskText';
import { useIsMobile } from '../../../../libs/useIsMobile';
import {
  desktopHeaderPhrase,
  desktopParagraphPhrase,
  eyebrow,
  mobileHeaderPhrase,
  mobileParagraphPhrase,
} from './constants';

/**
 * A positioning statement, not social proof.
 *
 * OraMedha has no customer logos, testimonials or verified counts to put
 * here, so this stays what it is: how the product was built, in the same
 * eyebrow-plus-headline shape the rest of the page already uses (see
 * IntroSection). Sits right before the FAQ, as the page's closing word on why
 * the workflow above looks the way it does.
 */
const TrustSection = () => {
  const isMobile = useIsMobile();

  return (
    <Wrapper>
      <Inner>
        <Header>
          <h3>{eyebrow}</h3>
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
      </Inner>
    </Wrapper>
  );
};

export default TrustSection;
