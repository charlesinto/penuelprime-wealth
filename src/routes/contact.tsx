import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteChrome";
import { ContactForm } from "@/components/ContactForm";

const TITLE = "Contact Penuel Wealth Club";
const DESCRIPTION =
  "Send an enquiry to the Penuel Prime team about Penuel Wealth Club membership, deals, returns or the entry-level opportunity from ₦1,000,000.";

export const Route = createFileRoute("/contact")({
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
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the Penuel Prime team"
        intro="Ask a question before you decide anything. Every message is stored and routed to the team for follow-up."
      />

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:items-start lg:px-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Where to start
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              If you already know the level you're considering, the express interest form is faster —
              it captures your tier so an advisor can prepare the right briefing.
            </p>
            <Link
              to="/express-interest"
              className="mt-6 inline-flex rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-orange-foreground transition-opacity hover:opacity-90"
            >
              Express interest instead
            </Link>

            <dl className="mt-10 space-y-5 border-t border-border pt-8 text-sm">
              <div>
                <dt className="font-semibold text-foreground">Website</dt>
                <dd className="mt-1">
                  <a href="https://penuelprime.com/" className="text-brand hover:underline">
                    penuelprime.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Location</dt>
                <dd className="mt-1 text-muted-foreground">Lagos, Nigeria</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Response time</dt>
                <dd className="mt-1 text-muted-foreground">
                  Enquiries are typically answered within one business day.
                </dd>
              </div>
            </dl>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
