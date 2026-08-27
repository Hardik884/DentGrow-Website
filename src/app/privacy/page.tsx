import type { Metadata } from 'next';
import { PrivacyPolicy } from '@/components';

export const metadata: Metadata = {
  title: 'Privacy Policy — OraMedha',
  description:
    'How OraMedha collects, uses, and protects information through this website and the OraMedha application.',
};

export default function PrivacyPage() {
  return (
    <main>
      <PrivacyPolicy />
    </main>
  );
}
