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
    question: 'What makes DentGrow different?',
    answer:
      'DentGrow is designed around the way dental clinics actually operate. Instead of separating appointments, patient information, clinical workflows, billing and follow-ups across different systems, it connects them in one workflow and adds an intelligence layer that helps you see what needs attention and what to do next.',
  },
  {
    question: 'What kind of clinics is DentGrow built for?',
    answer:
      'DentGrow is built for both independent clinics and larger dental teams, with workflows that can adapt to the way different clinics operate.',
  },
  {
    question: 'How does DentGrow keep clinic data secure?',
    answer:
      'Through role-based access and clinic-level data isolation. Every record belongs to a clinic, and what a dentist, a receptionist or a patient can each read and change is defined per role — both enforced in the database itself, not only in the interface.',
  },
  {
    question: 'Who can access patient information in DentGrow?',
    answer:
      'Access is controlled by user roles and clinic-level permissions. Dentists, receptionists and clinic owners work in the same system, each with the view their job needs, and a patient portal account is scoped to that patient alone.',
  },
  {
    question: 'Is clinic data isolated from other clinics?',
    answer:
      'Yes. Every record belongs to a clinic, and that boundary is enforced in the database itself rather than only in the interface, so an account can only ever reach the records of the clinic it belongs to.',
  },
];
