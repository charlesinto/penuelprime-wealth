import { useState } from "react";
import { Link } from "@tanstack/react-router";
import brandLogo from "@/assets/penuel-prime-logo.png";

export const navLinks = [
  { to: "/about", label: "How It Works" },
  { to: "/tiers", label: "Membership Tiers" },
  { to: "/deals", label: "Track Record" },
  { to: "/team", label: "Team" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-charcoal/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex items-center rounded-lg bg-white px-2.5 py-1.5">
            <img
              src={brandLogo}
              alt="Penuel Prime"
              width={104}
              height={32}
              className="h-7 w-auto"
            />
          </span>
          <span className="hidden text-sm font-semibold uppercase tracking-[0.18em] text-orange sm:block">
            Penuel Prime
          </span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                activeProps={{ className: "text-charcoal-foreground" }}
                className="text-sm font-medium text-charcoal-foreground/70 transition-colors hover:text-charcoal-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/express-interest"
            className="rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-orange-foreground transition-opacity hover:opacity-90"
          >
            Express Interest
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="rounded-md border border-white/20 px-3 py-2 text-sm text-charcoal-foreground lg:hidden"
          >
            ☰
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-white/10 px-5 pb-4 lg:hidden">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium text-charcoal-foreground/80"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-charcoal py-12">
      <div className="mx-auto grid max-w-7xl gap-8 border-t border-white/10 px-5 pt-10 sm:grid-cols-3 lg:px-8">
        <div>
          <span className="inline-flex items-center rounded-lg bg-white px-2.5 py-1.5">
            <img
              src={brandLogo}
              alt="Penuel Prime"
              width={104}
              height={32}
              className="h-7 w-auto"
            />
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-charcoal-foreground/70">
            Penuel Wealth Club is the membership and access layer for structured real estate finance
            deals originated by Penuel Prime.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-charcoal-foreground">Explore</h2>
          <ul className="mt-3 space-y-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-charcoal-foreground/70 transition-colors hover:text-charcoal-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-charcoal-foreground">Get in touch</h2>
          <ul className="mt-3 space-y-2 text-sm text-charcoal-foreground/70">
            <li>
              <a
                href="https://penuelprime.com/"
                className="transition-colors hover:text-charcoal-foreground"
              >
                penuelprime.com
              </a>
            </li>
            <li>Lagos, Nigeria</li>
            <li>
              <Link to="/express-interest" className="text-orange">
                Express interest
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl space-y-3 px-5 lg:px-8">
        <p className="max-w-4xl text-xs leading-relaxed text-charcoal-foreground/50">
          Penuel Wealth Club does not hold member funds as its own entity. Capital committed by
          members flows into structured notes and private placements originated by Penuel Prime.
          Real estate finance carries risk; returns are not guaranteed and every deal is documented
          individually.
        </p>
        <p className="text-xs text-charcoal-foreground/50">
          © {new Date().getFullYear()} Penuel Prime Limited. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="bg-charcoal py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-charcoal-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal-foreground/75">
          {intro}
        </p>
      </div>
    </section>
  );
}
