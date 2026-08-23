import offer_queue from '../../../../public/images/dentgrow/offer_queue.png';
import offer_patient from '../../../../public/images/dentgrow/offer_patient.png';
import offer_chart from '../../../../public/images/dentgrow/offer_chart.png';
import offer_revenue from '../../../../public/images/dentgrow/offer_revenue.png';

// For desktop
export const desktopHeaderPhrases = [
  'Everything your clinic',
  'needs, working together',
];
export const desktopParagraphPhrase = [
  'Appointments, patients, clinical work, payments and follow-ups stay connected',
  'instead of living across disconnected tools.',
];

// For mobile
export const mobileParagraphPhrase = [
  'Appointments, patients, clinical work, payments',
  'and follow-ups stay connected instead of living',
  'across disconnected tools.',
];

export const offers = [
  {
    illustration: offer_queue,
    title: 'Appointments and queue',
    alt: "DentGrow's Live Queue: who is being seen now and who is up next",
    details:
      'Bookings, check-ins and the day’s queue sit in one place, so the front desk always knows who is waiting and who is next.',
  },
  {
    illustration: offer_patient,
    title: 'Patients and history',
    alt: 'A DentGrow patient record showing visits, last visit and outstanding balance',
    details:
      'One record per patient: contact details, visit history, notes and what they still owe.',
  },
  {
    illustration: offer_chart,
    title: 'Clinical records',
    alt: 'A DentGrow dental chart with per-tooth treatment status and its legend',
    details:
      'A dental chart, treatments and consent that stay attached to the patient rather than to a folder.',
  },
  {
    illustration: offer_revenue,
    title: 'Billing and payments',
    alt: "DentGrow's revenue card showing the day's takings",
    details:
      'Bills raised from the treatment that was actually done, with payments and outstanding balances tracked against it.',
  },
];
