import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteChrome";

const TITLE = "Membership Tiers | Penuel Wealth Club";
const DESCRIPTION =
  "Three open entry tiers into Penuel Wealth Club — ₦10M, ₦50M and ₦100M minimum commitments — plus a separate entry-level real estate earning opportunity from ₦1,000,000.";

export const Route = createFileRoute("/tiers")({
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
  component: TiersPage,
});

const tiers = [
  {
    name: "Tier 1",
    amount: "₦10,000,000",
    body: "Entry into Club membership and access to the live structured note and private placement pipeline.",
    points: [
      "Minimum commitment of ₦10,000,000",
      "Access to member deal briefings",
      "Advisor-led onboarding and documentation",
    ],
  },
  {
    name: "Tier 2",
    amount: "₦50,000,000",
    body: "For members allocating meaningfully across more than one deal at a time.",
    points: [
      "Minimum commitment of ₦50,000,000",
      "Priority notification on new originations",
      "Allocation across multiple concurrent deals",
    ],
    featured: true,
  },
  {
    name: "Tier 3",
    amount: "₦100,000,000",
    body: "For institutional-scale participation in Penuel Prime's alternative financing pipeline.",
    points: [
      "Minimum commitment of ₦100,000,000",
      "First look at large originations",
      "Direct engagement with the origination team",
    ],
  },
];

function TiersPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership tiers"
        title="Three open entry tiers"
        intro="Each tier is defined by a minimum commitment threshold. There is no fixed cap on the number of members per tier."
      />

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <article
                key={tier.name}
                className={`flex flex-col rounded-2xl border bg-card p-8 ${
                  tier.featured ? "border-orange shadow-lg" : "border-border"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  {tier.name}
                </p>
                <p className="mt-4 text-3xl font-extrabold tracking-tight text-card-foreground">
                  {tier.amount}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Minimum commitment
                </p>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{tier.body}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-card-foreground">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[11px] font-bold text-brand">
                        ✓
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/express-interest"
                  className={`mt-8 rounded-full px-6 py-3.5 text-center text-sm font-semibold transition-colors ${
                    tier.featured
                      ? "bg-orange text-orange-foreground hover:opacity-90"
                      : "bg-brand text-brand-foreground hover:bg-brand-dark"
                  }`}
                >
                  Express interest
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange">
              Separate opportunity
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Earning opportunity from ₦1,000,000
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              A separate earning opportunity exists for participants from ₦1,000,000. This is not Club
              membership and it sits outside the tier structure above. It gives smaller participants a
              way to earn through real estate without being positioned inside the tiers.
            </p>
            <Link
              to="/express-interest"
              className="mt-8 inline-flex rounded-full border border-brand px-6 py-3.5 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-brand-foreground"
            >
              Enquire about the ₦1M+ opportunity
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="text-lg font-bold text-card-foreground">What to know</h3>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <li>Entry from ₦1,000,000, presented on its own terms.</li>
              <li>Not positioned as Penuel Wealth Club membership.</li>
              <li>Real estate backed, with terms documented per opportunity.</li>
              <li>Participants can move into a formal tier later if they wish.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
