type FAQItem = {
  question: string;
  answer: string;
};

export const desktopHeaderPhrase = ['Frequently asked', 'questions'];
export const mobileHeaderPhrase = ['Frequently', 'asked', 'questions'];
export const animate = {
  initial: {
    y: '100%',
    opacity: 0,
  },
  open: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: 1, delay: 0.1 * i, ease: [0.33, 1, 0.68, 1] },
  }),
};

/**
 * Security answers describe what the application enforces today — per-clinic
 * isolation and role-based access, both enforced in the database rather than
 * only in the interface. No certification or compliance claim is made here,
 * because none has been verified.
 */
export const faqData: FAQItem[] = [
  {
    question: 'What does OraMedha actually cover?',
    answer:
      'Patients and their history, appointments, the daily queue, the dental chart, treatments and consent, billing and payments, follow-ups and clinic analytics — plus a portal the patient uses themselves. One system rather than a tool for each of those.',
  },
  {
    question: 'Who in the clinic uses it?',
    answer:
      'Dentists, receptionists and clinic owners work in the same system, each with the view their job needs. Patients get their own portal, separate from the clinic-facing side.',
  },
  {
    question: 'What makes OraMedha different?',
    answer:
      'Appointments, patients, clinical records and billing are table stakes for a dental PMS. OraMedha brings those workflows together in a simpler experience, then adds an intelligence layer that surfaces what needs attention and helps you know what to do next. Instead of adding more information to manage, OraMedha turns what is already happening in your clinic into clear action.',
  },
  {
    question: 'What kind of clinics is OraMedha built for?',
    answer:
      'OraMedha is built for dental clinics of all sizes — from solo and independent clinics to larger teams. The workflows stay simple for smaller clinics while giving growing teams the connected visibility and coordination they need.',
  },
  {
    question: 'What does OraMedha mean?',
    answer:
      'OraMedha brings together two ideas: "Ora", inspired by oral and dental care, and "Medha", a Sanskrit word associated with intelligence, wisdom and understanding. Together, the name reflects what we\'re building — intelligence and clarity brought to the way dental clinics work.',
  },
  {
    question: 'How does OraMedha keep clinic data secure?',
    answer:
      'Through role-based access and clinic-level data isolation. Every record belongs to a clinic, and what a dentist, a receptionist or a patient can each read and change is defined per role — both enforced in the database itself, not only in the interface.',
  },
  {
    question: 'Who can access patient information in OraMedha?',
    answer:
      'Access is controlled by user roles and clinic-level permissions. Dentists, receptionists and clinic owners work in the same system, each with the view their job needs, and a patient portal account is scoped to that patient alone.',
  },
  {
    question: 'Is clinic data isolated from other clinics?',
    answer:
      'Yes. Every record belongs to a clinic, and that boundary is enforced in the database itself rather than only in the interface, so an account can only ever reach the records of the clinic it belongs to.',
  },
];
