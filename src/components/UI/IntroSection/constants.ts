import ic_arrows_right_left from '../../../../public/svgs/ic_arrows_right_left.svg';
import ic_identification from '../../../../public/svgs/ic_identification.svg';
import ic_banknotes from '../../../../public/svgs/ic_banknotes.svg';

// For desktop
export const desktopHeaderPhrase = ['Less front-desk chaos'];
export const desktopParagraphPhrase = [
  'Appointments, queues, check-ins, payments and follow-ups stay in one',
  'connected workflow.',
];

// For mobile
export const mobileHeaderPhrase = ['Less front-desk', 'chaos'];
export const mobileParagraphPhrase = [
  'Appointments, queues, check-ins, payments',
  'and follow-ups stay in one connected',
  'workflow.',
];

export const edges = [
  {
    point: 'One list for the day',
    details:
      'Booked appointments, walk-ins and check-ins land on the same schedule instead of a diary, a phone and somebody’s memory.',
    icon: ic_arrows_right_left,
  },
  {
    point: 'A queue everyone can see',
    details:
      'Who is waiting, who is in the chair and who is next — the same view at the desk and in the treatment room.',
    icon: ic_identification,
  },
  {
    point: 'Nothing left hanging',
    details:
      'Bills are settled against the treatment that was done, and follow-ups stay on a list until somebody rebooks them.',
    icon: ic_banknotes,
  },
];
