import { createFileRoute } from "@tanstack/react-router";
import { Check, MapPin, Navigation } from "lucide-react";
import { GlassCard } from "@/components/site/GlassCard";
import { Glow } from "@/components/site/Glow";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServiceIconBadge } from "@/components/site/ServiceIconBadge";
import { CallToAction } from "@/components/site/CallToAction";
import { Button } from "@/components/ui/button";
import {
  doctor,
  services,
  hospitals,
  getHospitalMapsUrl,
  getHospitalAddress,
} from "@/content/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: `Medical Services — ${doctor.name}` },
      {
        name: "description",
        content:
          "Consultations, diagnostics and treatment programmes offered in the practice, with what each service includes.",
      },
      { property: "og:title", content: `Medical Services — ${doctor.name}` },
      {
        property: "og:description",
        content: "Consultations, diagnostics and treatment programmes offered in the practice.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="hero-gradient">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
          <SectionHeading
            as="h1"
            eyebrow="Areas of experience"
            title="General medical care"
            description="Professional experience and clinical areas documented in Dra. Beatriz Silvestre Tápias's curriculum vitae."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 80} className="group h-full">
              <GlassCard wrapperClassName="h-full" intensity={6} className="rounded-3xl p-7">
                <ServiceIconBadge icon={service.icon} />
                <h2 className="mt-6 font-display text-xl font-semibold text-foreground">
                  {service.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="mb-12">
          <SectionHeading
            eyebrow="Clinical experience"
            title="Where Dra. Beatriz has worked"
            description="Previous clinical workplaces in public and private health services across São Paulo state in 2025."
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {hospitals.map((hosp, index) => {
            const mapsUrls = getHospitalMapsUrl(hosp);
            const address = getHospitalAddress(hosp);

            return (
              <Reveal key={hosp.id} delay={index * 60} className="relative flex flex-col">
                <Glow className="!rounded-3xl opacity-50" />
                <div className="glass-card glass-shine relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/50 shadow-[var(--shadow-soft)] dark:border-white/10">
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={hosp.photo}
                      alt={`${hosp.name} building exterior`}
                      width={600}
                      height={400}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h2 className="font-display text-lg font-semibold text-foreground">
                      {hosp.name}
                    </h2>
                    <p className="mt-0.5 text-xs font-medium text-primary">{hosp.department}</p>

                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      {hosp.description}
                    </p>

                    <ul className="mt-4 flex-1 space-y-2 text-xs text-muted-foreground">
                      <li className="flex gap-2">
                        <MapPin
                          className="mt-0.5 size-3 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span className="line-clamp-2">{address}</span>
                      </li>
                    </ul>

                    <div className="mt-5 flex gap-2">
                      <Button asChild size="sm" className="flex-1 rounded-full text-xs">
                        <a href={mapsUrls.search} target="_blank" rel="noreferrer noopener">
                          <MapPin className="size-3" aria-hidden="true" />
                          Maps
                        </a>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="flex-1 rounded-full text-xs"
                      >
                        <a href={mapsUrls.directions} target="_blank" rel="noreferrer noopener">
                          <Navigation className="size-3" aria-hidden="true" />
                          Directions
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="glass-card glass-shine relative mt-4 h-60 overflow-hidden rounded-3xl border border-white/50 shadow-[var(--shadow-soft)] dark:border-white/10">
                  <iframe
                    title={`Map showing the location of ${hosp.name}`}
                    src={mapsUrls.embed}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CallToAction />
      <div className="pb-8" />
    </>
  );
}
