import Layout from '@/components/Layout';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DentGrow',
  description:
    'DentGrow brings the people, patients and processes that run your clinic together in one place.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
