import ic_identification from '../../../../public/svgs/ic_identification.svg';
import ic_circle_stack from '../../../../public/svgs/ic_circle_stack.svg';
import ic_document_duplicate from '../../../../public/svgs/ic_document_duplicate.svg';

// For desktop
export const desktopHeaderPhrase = ['Treat with context'];
export const desktopParagraphPhrase = [
  'Patient history, clinical records, treatments and consent stay connected',
  'when the patient is in the chair.',
];
// The pull quote renders at 8rem inside 4.5rem of padding, so a line longer
// than ~17 characters re-wraps at 1024 and leaves an orphan. Kept under that.
export const desktopBriefNotePhrase = [
  'The chart, the',
  'history and the',
  'plan, open in',
  'front of you.',
];

// For mobile
export const mobileHeaderPhrase = ['Treat with context'];
export const mobileParagraphPhrase = [
  'Patient history, clinical records, treatments',
  'and consent stay connected when the patient',
  'is in the chair.',
];

export const mobileBriefNotePhrase = [
  'The chart,',
  'the history',
  'and the plan,',
  'open in front',
  'of you.',
];

export const edges = [
  {
    point: 'The whole history',
    details:
      'Past visits, treatments and notes sit on the patient record, so nobody has to reconstruct what happened last time',
    icon: ic_identification,
  },
  {
    point: 'A chart that stays current',
    details:
      'Tooth-by-tooth status updates as treatment is planned, started and completed — not after the fact',
    icon: ic_circle_stack,
  },
  {
    point: 'Consent where the work is',
    details:
      'Consent forms are raised and signed against the treatment they belong to, and stay on the record afterwards',
    icon: ic_document_duplicate,
  },
];
