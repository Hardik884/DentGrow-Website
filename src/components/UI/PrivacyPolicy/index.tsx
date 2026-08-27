'use client';
import {
  Wrapper,
  Inner,
  Header,
  Eyebrow,
  Title,
  LastUpdated,
  Layout,
  TocNav,
  TocList,
  TocLink,
  Content,
  Section,
  SectionHeading,
  SubHeading,
  Paragraph,
  BulletList,
} from './styles';
import { LAST_UPDATED, sections, type PolicyBlock } from './constants';

/**
 * Smooth-scrolls to a section without a full navigation — same easing as
 * every other in-page link on the site (see libs/useScrollToSection), rather
 * than the browser's default instant jump, which would be the one visibly
 * inconsistent interaction on an otherwise-matching page.
 */
function handleTocClick(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth',
    block: 'start',
  });
  window.history.replaceState(null, '', `#${id}`);
}

const renderBlock = (block: PolicyBlock, index: number) => {
  switch (block.type) {
    case 'h3':
      return <SubHeading key={index}>{block.text}</SubHeading>;
    case 'list':
      return (
        <BulletList key={index}>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </BulletList>
      );
    case 'p':
    default:
      return <Paragraph key={index}>{block.text}</Paragraph>;
  }
};

const PrivacyPolicy = () => {
  return (
    <Wrapper>
      <Inner>
        <Header>
          <Eyebrow>Legal</Eyebrow>
          <Title>Privacy Policy</Title>
          <LastUpdated>Last updated: {LAST_UPDATED}</LastUpdated>
        </Header>
        <Layout>
          <TocNav aria-label="Table of contents">
            <h2>On this page</h2>
            <TocList>
              {sections.map((section) => (
                <li key={section.id}>
                  <TocLink
                    href={`#${section.id}`}
                    onClick={(event) => handleTocClick(event, section.id)}
                  >
                    <span>{section.number}.</span>
                    {section.title}
                  </TocLink>
                </li>
              ))}
            </TocList>
          </TocNav>
          <Content>
            {sections.map((section) => (
              <Section key={section.id} id={section.id}>
                <SectionHeading>
                  <span>{section.number}.</span>
                  {section.title}
                </SectionHeading>
                {section.body.map(renderBlock)}
              </Section>
            ))}
          </Content>
        </Layout>
      </Inner>
    </Wrapper>
  );
};

export default PrivacyPolicy;
