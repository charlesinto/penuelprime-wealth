import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteChrome";

const TITLE = "How Penuel Wealth Club Works | Membership & Capital Flow";
const DESCRIPTION =
  "How membership in Penuel Wealth Club works: how capital flows into structured notes and private placements, and how this differs from Penuel Prime's mortgage business.";

export const Route = createFileRoute("/about")({
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
  component: AboutPage,
});

const steps = [
  {
    title: "Express interest",
    body: "You submit your details and the tier you are considering. Nothing is committed at this point.",
  },
  {
    title: "Vetting and briefing",
    body: "An advisor confirms your position, walks you through the current deal pipeline and shares the documentation for each opportunity.",
  },
  {
    title: "Commitment",
    body: "You commit at your chosen tier. Capital is deployed into a specific structured note or private placement originated by Penuel Prime.",
  },
  {
    title: "Deployment into the deal",
    body: "The deal funds a developer or a real estate finance requirement. Security sits against the underlying real estate.",
  },
  {
    title: "Reporting and exit",
    body: "You receive scheduled reporting through the term, with returns and exit handled per the terms of the specific instrument.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Club"
        title="Membership, explained"
        intro="Penuel Wealth Club is a membership initiative through which investors gain access to structured real estate finance deals originated by Penuel Prime."
      />

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              What membership gives you
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Membership is the access layer. It puts you in front of Penuel Prime's alternative
              financing business line — real estate notes and private placements that raise funding for
              developers — with the origination, vetting and documentation already done.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Entry is defined by minimum commitment thresholds rather than a fixed number of seats.
              There is no cap on how many members a tier can hold.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-cream p-7">
            <h2 className="text-lg font-bold text-foreground">How capital flows</h2>
            <ol className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <li>
                <span className="font-semibold text-foreground">1. Member commits</span> at a tier
                threshold.
              </li>
              <li>
                <span className="font-semibold text-foreground">2. Capital enters a deal</span> — an
                existing Penuel Prime structured note or private placement.
              </li>
              <li>
                <span className="font-semibold text-foreground">3. The deal funds real estate</span> —
                a developer requirement or real estate finance need, secured against property.
              </li>
              <li>
                <span className="font-semibold text-foreground">4. Returns and exit</span> follow the
                terms of that specific instrument.
              </li>
            </ol>
            <p className="mt-6 rounded-xl bg-card p-4 text-xs leading-relaxed text-muted-foreground">
              The Club itself does not hold member funds as its own entity. It is the membership and
              access layer that sits in front of these deals.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">The process</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From interest to exit
          </h2>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-border bg-card p-6">
                <span className="text-sm font-bold text-orange">0{index + 1}</span>
                <h3 className="mt-3 text-base font-bold text-card-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How this differs from the mortgage side of Penuel Prime
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card p-7">
              <h3 className="text-lg font-bold text-card-foreground">
                Penuel Wealth Club — alternative financing
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                You are an investor. Your capital funds developers through structured notes and private
                placements. Your outcome is a financial return governed by the instrument you enter.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-card p-7">
              <h3 className="text-lg font-bold text-card-foreground">
                Penuel Prime — mortgage and homeownership
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                You are a homebuyer. Penuel Prime helps you acquire and finance a home. That business
                line is separate from the Club and is not part of this membership.
              </p>
            </article>
          </div>
          <Link
            to="/tiers"
            className="mt-10 inline-flex rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-dark"
          >
            View membership tiers
          </Link>
        </div>
      </section>
    </>
  );
}
