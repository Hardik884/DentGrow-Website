import {
  FAQ,
  Featured,
  FinancialFuture,
  FinancilaFreedom,
  HeroSection,
  IntroSection,
  JoinSection,
  OffersSection,
  TrustSection,
} from '@/components';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Featured />
      <OffersSection />
      {/* Intelligence / Action Layer now leads Treat with context, so the
          narrative sees the whole connected workflow before it sees the
          intelligence layered on top of it, and only then the clinical
          detail underneath. */}
      <FinancialFuture />
      <FinancilaFreedom />
      <IntroSection />
      <JoinSection />
      <TrustSection />
      <FAQ />
    </main>
  );
}
