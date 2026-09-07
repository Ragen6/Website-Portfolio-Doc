import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { Hero } from "@/components/site/Hero";
import { Glow } from "@/components/site/Glow";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CallToAction } from "@/components/site/CallToAction";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { doctor, hospitals, getHospitalMapsUrl, getHospitalAddress } from "@/content/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${doctor.name} — ${doctor.specialization}` },
      {
        name: "description",
        content: `${doctor.specialization} with experience in urgent and emergency care across public and private health services.`,
      },
      { property: "og:title", content: `${doctor.name} — ${doctor.specialization}` },
      {
        property: "og:description",
        content: "Private medical practice built around unhurried, evidence-based care.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal className="order-2 lg:order-1">
            <div className="grid gap-4 sm:grid-cols-2">
              {doctor.specialties.slice(0, 4).map((item) => (
                <div key={item} className="relative">
                  <Glow className="!rounded-2xl opacity-50" />
                  <div className="glass-card glass-shine relative h-full rounded-2xl p-5">
                    <p className="font-display text-sm font-semibold text-foreground">{item}</p>
                    <p className="mt-1.5 text-xs text-muted-foreground">Clinical focus area</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="About"
              title="Care that starts with listening"
              description={doctor.bio[0]}
            />
            <Reveal delay={100} className="mt-6">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/about">
                  Read full profile
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="mb-12">
          <SectionHeading
            align="center"
            eyebrow="Clinical experience"
            title="Previous clinical workplaces"
            description="Dra. Beatriz Silvestre Tápias worked as a General Practitioner in these public and private health services during 2025."
          />
        </div>

        <Reveal>
          <div className="relative px-8 sm:px-12 md:px-14 mx-auto max-w-2xl">
            <Carousel
              opts={{
                align: "center",
                loop: true,
                containScroll: "trimSnaps",
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-3">
                {hospitals.map((hosp) => {
                  const mapsUrls = getHospitalMapsUrl(hosp);
                  const address = getHospitalAddress(hosp);

                  return (
                    <CarouselItem key={hosp.id} className="pl-2 md:pl-3 basis-full">
                      <div className="relative h-full">
                        <Glow className="!rounded-2xl opacity-50" />
                        <div className="glass-card glass-shine relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/50 shadow-[var(--shadow-soft)] transition-opacity duration-300 dark:border-white/10">
                          {/* Hospital Photo */}
                          <div className="relative h-32 w-full overflow-hidden">
                            <img
                              src={hosp.photo}
                              alt={`${hosp.name} building exterior`}
                              width={600}
                              height={400}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                          </div>

                          {/* Hospital Details */}
                          <div className="flex flex-1 flex-col p-3 sm:p-4">
                            <h3 className="font-display text-sm font-semibold text-foreground line-clamp-1">
                              {hosp.name}
                            </h3>
                            <p className="mt-0.5 text-xs font-medium text-primary line-clamp-1">
                              {hosp.department}
                            </p>

                            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                              {hosp.description}
                            </p>

                            {/* Location only: the CV does not list institutional contact details. */}
                            <ul className="mt-3 flex-1 space-y-1 text-xs text-muted-foreground">
                              <li className="flex gap-2">
                                <MapPin
                                  className="mt-0.5 size-2.5 shrink-0 text-primary"
                                  aria-hidden="true"
                                />
                                <span className="line-clamp-1 text-xs">{address}</span>
                              </li>
                            </ul>

                            {/* Action Buttons */}
                            <div className="mt-3 flex gap-1.5">
                              <Button asChild size="sm" className="flex-1 rounded-full text-xs h-8">
                                <a href={mapsUrls.search} target="_blank" rel="noreferrer noopener">
                                  <MapPin className="size-2.5" aria-hidden="true" />
                                  Maps
                                </a>
                              </Button>
                              <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="flex-1 rounded-full text-xs h-8"
                              >
                                <a
                                  href={mapsUrls.directions}
                                  target="_blank"
                                  rel="noreferrer noopener"
                                >
                                  Directions
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-8 top-1/2 -translate-y-1/2 size-8 rounded-full" />
              <CarouselNext className="absolute -right-8 top-1/2 -translate-y-1/2 size-8 rounded-full" />
            </Carousel>
          </div>
        </Reveal>

        <Reveal delay={100} className="mt-8 flex justify-center">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/services">
              View all hospitals
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
      </section>

      <CallToAction />
      <div className="pb-8" />
    </>
  );
}
