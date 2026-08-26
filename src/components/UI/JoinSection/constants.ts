import { StaticImageData } from 'next/image';
import ic_identification from '../../../../public/svgs/ic_identification.svg';
import ic_document_duplicate from '../../../../public/svgs/ic_document_duplicate.svg';
import ic_banknotes from '../../../../public/svgs/ic_banknotes.svg';

export type Props = {
  testimony: string;
  person: string;
  role: string;
  avatar: StaticImageData;
};

/**
 * This section carried customer testimonials on the original layout. OraMedha
 * has no verified customer quotes to put here, and inventing them is not an
 * option, so the composition is kept and filled with what the patient-facing
 * side of the product actually does. Nothing below is a claim about a customer,
 * an outcome or a result.
 */
export const testimonials = [
  {
    testimony:
      'Patients can see their upcoming appointments, where they are in today’s queue and what happened at past visits — without ringing the clinic to ask.',
    person: 'Appointments',
    role: 'In the patient portal',
    avatar: ic_identification,
  },
  {
    testimony:
      'Consent forms are sent, read and signed against the treatment they belong to, so the paperwork is done before the patient is in the chair.',
    person: 'Consent',
    role: 'In the patient portal',
    avatar: ic_document_duplicate,
  },
  {
    testimony:
      'Bills, payments already made and anything still outstanding are visible to the patient, so money is something both sides can see rather than discuss.',
    person: 'Billing',
    role: 'In the patient portal',
    avatar: ic_banknotes,
  },
  {
    testimony:
      'Prescriptions and treatment notes meant for the patient stay on their record, so what they were told is still there a week later.',
    person: 'Records',
    role: 'In the patient portal',
    avatar: ic_identification,
  },
  {
    testimony:
      'Follow-ups and recalls reach the patient with the visit they relate to, instead of a reminder that means nothing on its own.',
    person: 'Follow-ups',
    role: 'In the patient portal',
    avatar: ic_document_duplicate,
  },
];

export const desktopHeaderPhrase = [
  'A better experience',
  'for your patients',
];
