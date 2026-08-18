import { createFileRoute, Link } from "@tanstack/react-router";
import heroEstate from "@/assets/hero-estate.jpg";
import trackLand from "@/assets/track-land.jpg";
import trackResidential from "@/assets/track-residential.jpg";
import trackMortgage from "@/assets/track-mortgage.jpg";

//

const TITLE = "Penuel Wealth Club | Structured Real Estate Finance Membership";
const DESCRIPTION =
  "Penuel Wealth Club is the membership layer for structured real estate notes and private placements originated by Penuel Prime. Tiers from ₦10M, plus an entry opportunity from ₦1M.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

const pillars = [
  {
    title: "Access, not guesswork",
    body: "Membership puts you in front of structured real estate finance deals originated and vetted by Penuel Prime — not open-market speculation.",
  },
  {
    title: "A clear capital path",
    body: "Committed capital flows into Penuel Prime's structured notes and private placements. The Club is the access layer; it does not hold member funds as its own entity.",
  },
  {
    title: "Distinct from mortgage",
    body: "This is Penuel Prime's alternative financing line — raising funding for developers. It is separate from the mortgage and homeownership business.",
  },
];

const audience = [
  "Professionals and business owners with ₦10M+ to deploy into real estate credit",
  "Investors who want property-backed exposure without managing property",
  "Diaspora investors seeking documented, structured Nigerian real estate deals",
  "Smaller participants exploring the separate ₦1,000,000+ entry opportunity",
];

const deals = [
  {
    name: "Land banking notes",
    image: trackLand,
    body: "Funding acquisition of survey-backed plots in growth corridors ahead of the infrastructure curve.",
  },
  {
    name: "Serviced residential development",
    image: trackResidential,
    body: "Development finance for income-producing homes in secured estates with proven rental demand.",
  },
  {
    name: "Mortgage-linked private placements",
    image: trackMortgage,
    body: "Structured exposure to the homeowner funding pipeline, secured against real property equity.",
  },
];

const stats = [
  { value: "500+", label: "Clients served" },
  { value: "98%", label: "Satisfaction rate" },
  { value: "₦2B+", label: "Properties managed" },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-charcoal pb-20 pt-16 lg:pb-28 lg:pt-24">
        <div
          aria-hidden
          className="absolute -left-40 top-0 -z-10 h-[36rem] w-[36rem] rounded-full bg-brand/40 blur-[140px]"
        />
        <div
          aria-hidden
          className="absolute -right-32 bottom-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-orange/20 blur-[150px]"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" />A Penuel Prime initiative
            </span>
            <h1 className="mt-7 text-[2.6rem] font-extrabold leading-[1.03] tracking-tight text-charcoal-foreground sm:text-6xl lg:text-[4rem]">
              Structured real estate finance,
              <span className="block text-orange">by membership</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-charcoal-foreground/75 sm:text-lg">
              Penuel Wealth Club gives members access to real estate notes and private placements
              that fund developers — originated, vetted and documented by Penuel Prime.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/express-interest"
                className="rounded-full bg-orange px-7 py-4 text-sm font-semibold text-orange-foreground shadow-lg shadow-orange/20 transition-transform hover:-translate-y-0.5"
              >
                Express interest
              </Link>
              <Link
                to="/about"
                className="rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-charcoal-foreground transition-colors hover:border-orange hover:text-orange"
              >
                How it works
              </Link>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-2xl font-extrabold text-charcoal-foreground sm:text-3xl">
                    {stat.value}
                  </dd>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-charcoal-foreground/55">
                    {stat.label}
                  </p>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
              <img
                src={heroEstate}
                alt="Modern residential development at dusk funded through structured real estate finance"
                width={1920}
                height={1088}
                className="h-[24rem] w-full object-cover lg:h-[32rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-charcoal/70 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.18em] text-orange">Membership entry</p>
                <p className="mt-1 text-sm font-semibold text-charcoal-foreground">
                  Tier 1 from ₦10M · separate entry opportunity from ₦1M
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What it is */}
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
            What the Club is
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            A membership initiative for investors in structured real estate deals
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="rounded-2xl border border-border bg-card p-7">
                <div className="h-1 w-10 rounded-full bg-orange" />
                <h3 className="mt-5 text-xl font-bold text-card-foreground">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Who it is for */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              Who it is for
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Serious investors who want property-backed structure
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Members are matched to live deals according to the tier they enter and their timeline.
              A separate entry-level opportunity exists for participants from ₦1,000,000 — it sits
              outside the tier structure.
            </p>
            <Link
              to="/tiers"
              className="mt-8 inline-flex rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-dark"
            >
              See membership tiers
            </Link>
          </div>
          <ul className="space-y-4">
            {audience.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-card-foreground"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange text-[11px] font-bold text-orange-foreground">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Deals preview */}
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Deal types</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Where member capital goes to work
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {deals.map((deal) => (
              <article
                key={deal.name}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
              >
                <img
                  src={deal.image}
                  alt={deal.name}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-52 w-full object-cover"
                />
                <div className="p-7">
                  <h3 className="text-xl font-bold text-card-foreground">{deal.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{deal.body}</p>
                </div>
              </article>
            ))}
          </div>
          <Link
            to="/deals"
            className="mt-10 inline-flex rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
          >
            View track record
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal py-20 lg:py-24">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-5 text-left lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-charcoal-foreground sm:text-4xl">
              Ready to look at the numbers?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-charcoal-foreground/75">
              Register your interest and an advisor will take you through the current pipeline, the
              tier that fits and the documentation involved.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/express-interest"
              className="rounded-full bg-orange px-7 py-4 text-sm font-semibold text-orange-foreground"
            >
              Express interest
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-charcoal-foreground transition-colors hover:border-orange hover:text-orange"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
