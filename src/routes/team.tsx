import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteChrome";

const TITLE = "Team & Leadership | Penuel Wealth Club";
const DESCRIPTION =
  "The Penuel Group leadership behind Penuel Wealth Club — origination, structuring, real estate delivery and investor relations.";

export const Route = createFileRoute("/team")({
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
  component: TeamPage,
});

const functions = [
  {
    role: "Group leadership",
    body: "Sets investment policy across Penuel Group and signs off on every origination entering the Club pipeline.",
  },
  {
    role: "Origination & structuring",
    body: "Sources developer funding requirements, structures the notes and private placements and negotiates security.",
  },
  {
    role: "Real estate delivery",
    body: "Oversees the underlying projects — title, construction progress and delivery milestones tied to drawdowns.",
  },
  {
    role: "Investor relations",
    body: "Onboards members, handles documentation and delivers scheduled reporting through the life of each deal.",
  },
];

const credibility = [
  "Operating across real estate, mortgage and alternative financing under Penuel Group",
  "₦2B+ in property value managed to date",
  "500+ clients served across homeownership and investment",
  "Every deal title-checked, documented and secured against real property",
];

function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Team"
        title="Penuel Group leadership"
        intro="The Club is run by the same team that originates, structures and delivers Penuel Prime's real estate and finance projects."
      />

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {functions.map((item) => (
              <article key={item.role} className="rounded-2xl border border-border bg-card p-7">
                <div className="h-1 w-10 rounded-full bg-orange" />
                <h2 className="mt-5 text-xl font-bold text-card-foreground">{item.role}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            Named executive profiles and photographs can be added here once supplied by the Penuel Prime
            team.
          </p>
        </div>
      </section>

      <section className="bg-cream py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Credibility</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              A track record you can check
            </h2>
            <Link
              to="/deals"
              className="mt-8 inline-flex rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-dark"
            >
              See the track record
            </Link>
          </div>
          <ul className="space-y-4">
            {credibility.map((item) => (
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
    </>
  );
}
