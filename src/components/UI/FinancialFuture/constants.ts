import ic_circle_stack from '../../../../public/svgs/ic_circle_stack.svg';
import ic_arrows_right_left from '../../../../public/svgs/ic_arrows_right_left.svg';

export const cardsInfo = [
  {
    title: 'See what needs attention',
    details:
      'DentGrow reads the day’s activity and surfaces what is actually going wrong — worst first, in plain language rather than a wall of charts.',
    icon: ic_circle_stack,
  },
  {
    title: 'Know what to do next',
    details:
      'Every signal comes with the step that answers it and the button that starts it, so a problem the clinic can see is a problem the clinic can act on.',
    icon: ic_arrows_right_left,
  },
];

/**
 * These are counts of what the software does, taken from the Business Brain
 * implementation itself — 28 metric definitions, 18 signal evaluators across
 * five categories (financial, scheduling, retention, operational, clinical),
 * producing one daily briefing. They are deliberately NOT customer numbers,
 * revenue figures or outcome claims, none of which DentGrow has verified.
 */
export const stats = [
  {
    number: '28',
    subtitle: 'clinic metrics',
  },
  {
    number: '18',
    subtitle: 'signals watched',
  },
  {
    number: '5',
    subtitle: 'areas of the clinic',
  },
  {
    number: '1',
    subtitle: 'daily briefing',
  },
];

// For desktop
export const desktopHeaderPhrase = [
  'Don’t just see',
  'your clinic. Know',
  'what to do next.',
];
export const desktopParagraphPhrase = [
  'DentGrow turns clinic activity into actionable insights so your team can see',
  'what needs attention.',
];

// For mobile
export const mobileHeaderPhrase = [
  'Don’t just see your',
  'clinic. Know what',
  'to do next.',
];
export const mobileParagraphPhrase = [
  'DentGrow turns clinic activity into',
  'actionable insights so your team can',
  'see what needs attention.',
];
