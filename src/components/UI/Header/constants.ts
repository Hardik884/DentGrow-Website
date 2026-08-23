import { SECTION_IDS } from '../../../../libs/useScrollToSection';

export const menu = {
  open: {
    width: '250px',
    height: '300px',
    top: '-25px',
    right: '-25px',
    transition: { duration: 0.75, type: 'tween', ease: [0.76, 0, 0.24, 1] },
  },

  closed: {
    width: '55px',
    height: '40px',
    top: '0px',
    right: '-4px',
    transition: {
      duration: 0.75,
      delay: 0.35,
      type: 'tween',
      ease: [0.76, 0, 0.24, 1],
    },
  },
};
/**
 * The navigation. Each entry points at a section that exists on this page, so
 * every link has a real destination — there is no Pricing page to send anyone
 * to, so there is no Pricing link.
 */
export const links = [
  {
    href: `#${SECTION_IDS.product}`,
    linkTo: 'Product',
  },
  {
    href: `#${SECTION_IDS.solutions}`,
    linkTo: 'Solutions',
  },
  {
    href: `#${SECTION_IDS.security}`,
    linkTo: 'Security',
  },
];
