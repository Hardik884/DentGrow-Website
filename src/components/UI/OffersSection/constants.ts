import offer_queue from '../../../../public/images/dentgrow/offer_queue.png';
import offer_patient from '../../../../public/images/dentgrow/offer_patient.png';
import offer_chart from '../../../../public/images/dentgrow/offer_chart.png';
import offer_revenue from '../../../../public/images/dentgrow/offer_revenue.png';

// For desktop
// Two distinct sentences, not one wrapped across two lines: the first states
// the scope, the second names what holds it together. MaskText already
// staggers each phrase's reveal, which is what gives the pair its hierarchy.
export const desktopHeaderPhrases = [
  'Everything your clinic needs.',
  'One connected workflow.',
];
export const desktopParagraphPhrase = [
  'Appointments, patients, clinical work, billing, payments and follow-ups',
  'stay connected from first booking to completed treatment.',
];

// For mobile
export const mobileParagraphPhrase = [
  'Appointments, patients, clinical work,',
  'billing, payments and follow-ups stay',
  'connected from first booking to',
  'completed treatment.',
];

export const offers = [
  {
    illustration: offer_queue,
    title: 'Appointments and queue',
    alt: "OraMedha's Live Queue: who is being seen now and who is up next",
    details:
      'Bookings, check-ins and the day’s queue sit in one place, so the front desk always knows who is waiting and who is next.',
  },
  {
    illustration: offer_patient,
    title: 'Patients and history',
    alt: 'An OraMedha patient record showing visits, last visit and outstanding balance',
    details:
      'One record per patient: contact details, visit history, notes and what they still owe.',
  },
  {
    illustration: offer_chart,
    title: 'Clinical records',
    alt: 'An OraMedha dental chart with per-tooth treatment status and its legend',
    details:
      'A dental chart, treatments and consent that stay attached to the patient rather than to a folder.',
  },
  {
    illustration: offer_revenue,
    title: 'Billing and payments',
    alt: "OraMedha's revenue card showing the day's takings",
    details:
      'Bills raised from the treatment that was actually done, with payments and outstanding balances tracked against it.',
  },
];
