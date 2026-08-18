import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteChrome";

const TITLE = "FAQ | Penuel Wealth Club";
const DESCRIPTION =
  "Answers on minimum commitment, how returns work, exit and liquidity, vetting, and how Penuel Wealth Club differs from Penuel Prime's mortgage business.";

const faqs = [
  {
    q: "What is the minimum commitment?",
    a: "Formal membership starts at Tier 1 with a minimum commitment of ₦10,000,000. Tier 2 is ₦50,000,000 and Tier 3 is ₦100,000,000. A separate earning opportunity exists from ₦1,000,000 — that one is not Club membership and sits outside the tier structure.",
  },
  {
    q: "How do returns work?",
    a: "Returns are governed by the specific structured note or private placement your capital enters, not by the Club itself. Each instrument sets its own term, return profile and payment schedule, and this is documented before you commit. Returns are not guaranteed.",
  },
  {
    q: "Where does my money actually go?",
    a: "Committed capital flows into Penuel Prime's existing structured notes and private placements, which raise funding for developers. The Club does not hold member funds as its own entity — it is the membership and access layer in front of those deals.",
  },
  {
    q: "What about exit and liquidity?",
    a: "These instruments are term-based rather than instantly liquid. Exit follows the terms of the deal you entered, typically at maturity or at a defined exit event. Early exit, where possible at all, is handled case by case with the origination team.",
  },
  {
    q: "How are deals vetted?",
    a: "Every opportunity is originated by Penuel Prime and passes title verification, physical inspection, developer due diligence and structuring of security against the underlying real estate before it reaches members.",
  },
  {
    q: "Is this the same as Penuel Prime's mortgage service?",
    a: "No. The Club is Penuel Prime's alternative financing business line, where you participate as an investor. The mortgage and homeownership business, where Penuel Prime helps you buy and finance a home, is separate.",
  },
  {
    q: "Is there a limit on members per tier?",
    a: "No. Tiers are defined by minimum commitment thresholds, not by a fixed number of seats. Allocation to any individual deal is, however, limited by the size of that deal.",
  },
  {
    q: "What happens after I express interest?",
    a: "Your submission is stored and routed to the Penuel Prime team. An advisor contacts you to confirm your position, brief you on the live pipeline and share documentation. Nothing is committed at the point of enquiry.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions investors ask first"
        intro="Minimum commitment, how returns work, exit and liquidity, and how opportunities are vetted."
      />

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <dl className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-border bg-card p-7">
                <dt className="text-lg font-bold text-card-foreground">{faq.q}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.a}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 rounded-2xl bg-cream p-8 text-center">
            <h2 className="text-xl font-bold text-foreground">Still have a question?</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Send it to the team and we'll come back to you.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-dark"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
