'use client';
import Image from 'next/image';
import ic_copyright from '../../../../public/svgs/ic_copyright.svg';
import { GetStartedButton, Logo } from '@/components';
import { useDemoDialog } from '../../Common/DemoDialog/context';
import {
  SECTION_IDS,
  useScrollToSection,
} from '../../../../libs/useScrollToSection';

/**
 * Footer navigation.
 *
 * The Product column mirrors the header and points at the same sections, so
 * both navigations agree and neither carries a Pricing entry there is no page
 * for. "Contact" opens the demo dialog, which is the site's only contact
 * channel. The remaining entries are labels, not links: they name who the
 * product is for, and are styled as plain text so nothing invites a click that
 * would go nowhere.
 */
type FooterEntry = {
  label: string;
  /** A section on this page. */
  href?: string;
  /** Opens the demo dialog rather than navigating. */
  action?: 'demo';
};

const linksArr: { title: string; links: FooterEntry[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Product', href: `#${SECTION_IDS.product}` },
      { label: 'Solutions', href: `#${SECTION_IDS.solutions}` },
      { label: 'Security', href: `#${SECTION_IDS.security}` },
    ],
  },
  {
    title: 'For your clinic',
    links: [
      { label: 'Dentists' },
      { label: 'Receptionists' },
      { label: 'Clinic owners' },
      { label: 'Patients' },
    ],
  },
  {
    title: 'Company',
    links: [{ label: 'Contact', action: 'demo' }],
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
  FooterLink,
  FooterButton,
  FooterBottom,
  CopyRight,
} from './styles';

const Footer = () => {
  const scrollToSection = useScrollToSection();
  const { open } = useDemoDialog();

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
                  that keep your clinic growing.
                </p>
                <ActionCtn>
                  <GetStartedButton size="default" />
                </ActionCtn>
              </TextCtn>
            </CallToAction>
            <FooterNavigation>
              {linksArr.map((column, i) => (
                <GridColumn key={i}>
                  <h3>{column.title}</h3>
                  <LinksContainer>
                    {column.links.map((link, j) => (
                      <li key={j}>
                        {link.href ? (
                          <FooterLink
                            href={link.href}
                            onClick={(event) =>
                              scrollToSection(event, link.href as string)
                            }
                          >
                            {link.label}
                          </FooterLink>
                        ) : link.action === 'demo' ? (
                          <FooterButton type="button" onClick={open}>
                            {link.label}
                          </FooterButton>
                        ) : (
                          link.label
                        )}
                      </li>
                    ))}
                  </LinksContainer>
                </GridColumn>
              ))}
            </FooterNavigation>
          </FooterMiddle>
          <FooterBottom>
            <CopyRight>
              <Image src={ic_copyright} alt="" aria-hidden />
              OraMedha
            </CopyRight>
          </FooterBottom>
        </FooterMainContent>
      </Inner>
    </Wrapper>
  );
};

export default Footer;
