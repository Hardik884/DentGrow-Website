'use client';
import { styled } from 'styled-components';

/**
 * A legal document, not another marketing section.
 *
 * Every other page section on this site is built to be looked at while
 * scrolling past; this one is built to be read. That is the one deliberate
 * departure from the rest of the site: no MaskText reveal on the headings, no
 * scroll-triggered motion on the body — the content is simply there, so nothing
 * stands between a visitor and reading it, and so the page still makes sense
 * with JavaScript disabled or with reduced motion requested. Colour, type
 * family, spacing scale (rem, matching the site's own multiples) and the two
 * accent tokens (--jade-legible, --jade-hover) are unchanged from the rest of
 * the site — this page still looks like OraMedha, it just doesn't move.
 */
export const Wrapper = styled.section`
  padding: 9.5rem 0 8rem;

  @media (max-width: 768px) {
    padding: 6.5rem 0 5rem;
  }
`;

export const Inner = styled.div`
  width: 90%;
  max-width: 1440px;
  margin: 0 auto;
`;

export const Eyebrow = styled.p`
  color: var(--jade-legible);
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-bottom: 1rem;
`;

export const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 400;
  max-width: 40rem;

  @media (max-width: 768px) {
    font-size: 2.75rem;
  }
`;

export const LastUpdated = styled.p`
  color: var(--link-color);
  font-size: 1rem;
  margin-top: 1.25rem;
`;

/*
 * Header sits full-width (matching every other section on the site); the
 * two-column reading layout starts below it, in Layout.
 */
export const Header = styled.header`
  padding-bottom: 3.5rem;
  border-bottom: 0.0625rem solid #3d3d3d;
  margin-bottom: 3.5rem;
`;

/**
 * The table of contents sits alongside the body on a wide viewport — sticky,
 * so a reader partway through a long policy can still jump — and moves above
 * it, no longer sticky, once the two columns would not both fit legibly.
 */
export const Layout = styled.div`
  display: grid;
  grid-template-columns: 15.5rem minmax(0, 1fr);
  gap: 4.5rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

export const TocNav = styled.nav`
  position: sticky;
  top: 2rem;

  h2 {
    font-size: 0.875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    color: var(--link-color);
    margin-bottom: 1rem;
  }

  @media (max-width: 1024px) {
    position: static;
  }
`;

export const TocList = styled.ol`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  /* A long policy's numbers run to two digits; a fixed column keeps every
     title starting at the same x-position instead of ragging with the count. */
  counter-reset: none;

  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const TocLink = styled.a`
  display: flex;
  gap: 0.5rem;
  color: var(--link-color);
  font-size: 0.9375rem;
  line-height: 1.4;
  text-decoration: none;
  transition: color 0.2s ease;

  span {
    color: var(--link-color);
    opacity: 0.6;
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
  }

  &:hover,
  &:focus-visible {
    color: var(--white);
  }

  &:focus-visible {
    outline: 2px solid var(--jade-hover);
    outline-offset: 3px;
    border-radius: 2px;
  }
`;

/**
 * The reading column. Capped narrow — this is the one deliberate width
 * departure from the rest of the site, where sections run to 56rem of prose
 * at most for a headline. A privacy policy is paragraphs, not headlines, and
 * a line much wider than this becomes hard to track by eye.
 */
export const Content = styled.article`
  max-width: 42rem;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;

export const Section = styled.section`
  scroll-margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const SectionHeading = styled.h2`
  font-size: 1.75rem;
  font-weight: 500;
  display: flex;
  gap: 0.625rem;

  span {
    color: var(--link-color);
    opacity: 0.5;
    font-variant-numeric: tabular-nums;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const SubHeading = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  margin-top: 0.5rem;
`;

export const Paragraph = styled.p`
  color: var(--link-color);
  font-size: 1.0625rem;
  line-height: 1.75rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6rem;
  }
`;

export const BulletList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-left: 1.25rem;

  li {
    color: var(--link-color);
    font-size: 1.0625rem;
    line-height: 1.6rem;
    list-style: disc;

    &::marker {
      color: var(--jade-legible);
    }
  }

  @media (max-width: 768px) {
    li {
      font-size: 1rem;
      line-height: 1.55rem;
    }
  }
`;
