import type { Metadata } from 'next';
import { PrivacyPolicy } from '@/components';

export const metadata: Metadata = {
  title: 'Privacy Policy — OraMedha',
  description:
    'How OraMedha collects, uses, and protects information through this website and the OraMedha application.',
  /*
   * Without its own openGraph/twitter block a shared /privacy link would
   * fall back to the homepage's marketing pitch (see layout.tsx) — accurate
   * for the domain, not for the page. The generated share image at
   * src/app/opengraph-image.tsx is scoped to the `/` segment only — Next
   * doesn't cascade file-convention metadata images to nested routes — so
   * it's referenced here explicitly rather than regenerated.
   */
  openGraph: {
    title: 'Privacy Policy — OraMedha',
    description:
      'How OraMedha collects, uses, and protects information through this website and the OraMedha application.',
    url: 'https://oramedha.com/privacy',
    siteName: 'OraMedha',
    type: 'website',
    locale: 'en_US',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — OraMedha',
    description:
      'How OraMedha collects, uses, and protects information through this website and the OraMedha application.',
    images: ['/opengraph-image'],
  },
};

export default function PrivacyPage() {
  return (
    <main>
      <PrivacyPolicy />
    </main>
  );
}
