import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteChrome";
import trackLand from "@/assets/track-land.jpg";
import trackResidential from "@/assets/track-residential.jpg";
import trackMortgage from "@/assets/track-mortgage.jpg";

const TITLE = "Track Record & Deals | Penuel Wealth Club";
const DESCRIPTION =
  "Real estate projects funded through Penuel Prime's structured notes and private placements, plus the categories of deals currently available to Wealth Club members.";

export const Route = createFileRoute("/deals")({
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
  component: DealsPage,
});

const projects = [
  {
    name: "Lagos Island luxury apartments",
    image: trackResidential,
    status: "Funded",
    body: "Development finance for a premium apartment scheme, structured as a note secured against the project's real estate.",
  },
  {
    name: "Lekki Prime Residences",
    image: trackLand,
    status: "Funded · in delivery",
    body: "Phased residential development in a secured estate corridor, funded through a private placement with staged drawdowns.",
  },
  {
    name: "Mortgage-linked funding pipeline",
    image: trackMortgage,
    status: "Open to members",
    body: "Structured exposure to homeowner funding secured against real property equity, sized per member commitment.",
  },
];

const stats = [
  { value: "500+", label: "Clients served" },
  { value: "98%", label: "Satisfaction rate" },
  { value: "₦2B+", label: "Properties managed" },
];

function DealsPage() {
  return (
    <>
      <PageHero
        eyebrow="Track record"
        title="Real estate we have funded"
        intro="A representative view of the projects behind Penuel Prime's alternative financing line. Specific commercial terms are confidential and shared with members under documentation."
      />

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.name}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
              >
                <img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-52 w-full object-cover"
                />
                <div className="p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange">
                    {project.status}
                  </p>
                  <h2 className="mt-3 text-xl font-bold text-card-foreground">{project.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.body}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">
            Project descriptions are illustrative where commercial specifics are confidential. Past
            performance is not a guide to future results; real estate finance carries risk and returns
            are not guaranteed.
          </p>
        </div>
      </section>

      <section className="bg-charcoal py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-5 text-center sm:grid-cols-3 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-extrabold tracking-tight text-orange sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.18em] text-charcoal-foreground/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-5 text-center lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Want the current pipeline?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Live opportunities are shared with members and prospective members under documentation.
          </p>
          <Link
            to="/express-interest"
            className="mt-8 inline-flex rounded-full bg-brand px-7 py-4 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-dark"
          >
            Express interest
          </Link>
        </div>
      </section>
    </>
  );
}
