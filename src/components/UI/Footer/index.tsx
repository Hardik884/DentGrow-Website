import Image from 'next/image';
import ic_chevron_down from '../../../../public/svgs/ic_chevron_down.svg';
import ic_copyright from '../../../../public/svgs/ic_copyright.svg';
import { GetStartedButton, Logo } from '@/components';

const linksArr = [
  {
    title: 'Product',
    links: ['Product', 'Solutions', 'Security', 'Pricing'],
  },
  {
    title: 'For your clinic',
    links: ['Dentists', 'Receptionists', 'Clinic owners', 'Patients'],
  },
  {
    title: 'Company',
    links: ['Contact', 'Privacy policy', 'Terms of use'],
  },
];

import {
  Wrapper,
  Inner,
  FooterLogo,
  FooterMainContent,
  FooterMiddle,
  CallToAction,
  TextCtn,
  ActionCtn,
  FooterNavigation,
  GridColumn,
  LinksContainer,
  FooterBottom,
  Translator,
  CopyRight,
} from './styles';

const Footer = () => {
  return (
    <Wrapper>
      <Inner>
        <FooterLogo>
          <Logo size={56} />
        </FooterLogo>
        <FooterMainContent>
          <FooterMiddle>
            {/* The closing call to action. Book a Demo is the only thing the
                site asks for — there is no sign-in or account link anywhere. */}
            <CallToAction>
              <TextCtn>
                <h3>Bring your clinic together.</h3>
                <p>
                  One connected system for the people, patients and processes
                  that keep your practice moving.
                </p>
                <ActionCtn>
                  <GetStartedButton padding="0.75rem 1.5rem" />
                </ActionCtn>
              </TextCtn>
            </CallToAction>
            <FooterNavigation>
              {linksArr.map((l, i) => (
                <GridColumn key={i}>
                  <h3>{l.title}</h3>
                  <LinksContainer>
                    {l.links.map((link, i) => (
                      <li key={i}>{link}</li>
                    ))}
                  </LinksContainer>
                </GridColumn>
              ))}
            </FooterNavigation>
          </FooterMiddle>
          <FooterBottom>
            <Translator>
              <h3>English (United Kingdom)</h3>
              <Image src={ic_chevron_down} alt="chevron down" />
            </Translator>
            <CopyRight>
              <Image src={ic_copyright} alt="copyright svg" />
              DentGrow
            </CopyRight>
          </FooterBottom>
        </FooterMainContent>
      </Inner>
    </Wrapper>
  );
};

export default Footer;
