import { Link } from "@tanstack/react-router";
import { Activity, Mail, Phone } from "lucide-react";
import { contact, doctor, socials } from "@/content/site";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/40 bg-white/25 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-12">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Activity className="size-5" aria-hidden="true" />
            </span>
            <span className="font-display text-base font-semibold text-foreground">
              {doctor.shortName}
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {doctor.tagline}
          </p>
          <SocialLinks className="mt-5" items={socials} />
        </div>

        <nav aria-label="Footer">
          <h2 className="font-display text-sm font-semibold text-foreground">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {[
              { label: "About", to: "/about" },
              { label: "Services", to: "/services" },
            ].map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Patient information">
          <h2 className="font-display text-sm font-semibold text-foreground">Patients</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link to="/contact" className="transition-colors hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-semibold text-foreground">Get in touch</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <a href={`tel:${contact.phone}`} className="transition-colors hover:text-primary">
                {contact.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <a href={`mailto:${contact.email}`} className="transition-colors hover:text-primary">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-12">
          <p>
            &copy; {new Date().getFullYear()} {doctor.name}. All rights reserved.
          </p>
          <p>{doctor.license}</p>
        </div>
      </div>
    </footer>
  );
}
