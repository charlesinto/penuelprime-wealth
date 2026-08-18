import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteChrome";
import { ExpressInterestForm } from "@/components/ExpressInterestForm";

const TITLE = "Express Interest | Penuel Wealth Club";
const DESCRIPTION =
  "Indicate serious interest in Penuel Wealth Club — choose Tier 1 (₦10M), Tier 2 (₦50M), Tier 3 (₦100M) or the separate opportunity from ₦1,000,000.";

export const Route = createFileRoute("/express-interest")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExpressInterestPage,
});

const assurances = [
  "Nothing is committed at this stage — this is an expression of interest, not a subscription.",
  "An advisor confirms your position and briefs you on the live pipeline.",
  "Documentation, term, security and return profile are shared before any capital moves.",
  "Your details are stored securely and used only for Penuel Prime follow-up.",
];

function ExpressInterestPage() {
  return (
    <>
      <PageHero
        eyebrow="Express interest"
        title="Tell us the level you're considering"
        intro="Three details and your tier of interest. An advisor takes it from there."
      />

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              What happens next
            </h2>
            <ul className="mt-7 space-y-4">
              {assurances.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange text-[11px] font-bold text-orange-foreground">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-border bg-cream p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Entry levels
              </p>
              <ul className="mt-4 space-y-2 text-sm text-foreground">
                <li>Tier 1 — from ₦10,000,000</li>
                <li>Tier 2 — from ₦50,000,000</li>
                <li>Tier 3 — from ₦100,000,000</li>
                <li className="pt-2 text-muted-foreground">
                  Separate earning opportunity — from ₦1,000,000 (not Club membership)
                </li>
              </ul>
            </div>
          </div>

          <ExpressInterestForm />
        </div>
      </section>
    </>
  );
}
