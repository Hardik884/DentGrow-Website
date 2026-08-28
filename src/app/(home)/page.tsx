import {
  FAQ,
  Featured,
  FinancialFuture,
  FinancilaFreedom,
  HeroSection,
  IntroSection,
  JoinSection,
  OffersSection,
  SimplicitySection,
  TrustSection,
} from '@/components';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Featured />
      <OffersSection />
      {/* Action Layer follows the connected workflow directly, so the page
          sees the whole workflow before it sees the intelligence layered on
          top of it. */}
      <FinancialFuture />
      {/* A short brand beat — simple, not another feature — right after the
          Action Layer, so the page states plainly that the intelligence
          just shown didn't make the product harder to use, before the
          clinical detail underneath it. */}
      <SimplicitySection />
      <FinancilaFreedom />
      <IntroSection />
      <JoinSection />
      <TrustSection />
      <FAQ />
    </main>
  );
}
