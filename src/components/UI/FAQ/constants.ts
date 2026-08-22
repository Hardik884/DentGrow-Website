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
    question: 'What does DentGrow actually cover?',
    answer:
      'Patients and their history, appointments, the daily queue, the dental chart, treatments and consent, billing and payments, follow-ups and clinic analytics — plus a portal the patient uses themselves. One system rather than a tool for each of those.',
  },
  {
    question: 'Who in the clinic uses it?',
    answer:
      'Dentists, receptionists and clinic owners work in the same system, each with the view their job needs. Patients get their own portal, separate from the clinic-facing side.',
  },
  {
    question: 'How is our clinic’s data kept separate from other clinics?',
    answer:
      'Every record belongs to a clinic, and that boundary is enforced in the database itself rather than only in the interface. An account can only reach the records of the clinic it belongs to.',
  },
  {
    question: 'Who can see what inside the clinic?',
    answer:
      'Access is role-based. What a dentist, a receptionist and a patient can each read and change is defined per role and enforced on every request, so a patient portal account cannot reach clinic-wide records.',
  },
];
