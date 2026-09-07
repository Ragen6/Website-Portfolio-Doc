import { createFileRoute } from "@tanstack/react-router";
import { Award, BadgeCheck, GraduationCap, Languages } from "lucide-react";
import { GlassCard } from "@/components/site/GlassCard";
import { Glow } from "@/components/site/Glow";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CallToAction } from "@/components/site/CallToAction";
import { certifications, doctor, education, timeline } from "@/content/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About ${doctor.name} — Biography & Credentials` },
      {
        name: "description",
        content: `Biography, education, certifications and career timeline of ${doctor.name}, ${doctor.specialization}.`,
      },
      { property: "og:title", content: `About ${doctor.name}` },
      {
        property: "og:description",
        content: "Education, certifications, specialties and career history.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="hero-gradient">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-24">
          <Reveal>
            <img
              src={doctor.portrait}
              alt={`${doctor.name} portrait`}
              width={912}
              height={1104}
              className="w-full rounded-[2rem] border border-white/50 object-cover shadow-[var(--shadow-lift)] dark:border-white/15"
            />
          </Reveal>
          <div>
            <SectionHeading
              as="h1"
              align="left"
              eyebrow="About"
              title={doctor.name}
              description={doctor.specialization}
            />
            <Reveal delay={90} className="mt-6 space-y-4">
              {doctor.bio.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </Reveal>
            <Reveal delay={120} className="mt-8 grid gap-4 sm:grid-cols-2">
              <GlassCard intensity={5} className="rounded-2xl p-5">
                <BadgeCheck className="size-5 text-primary" aria-hidden="true" />
                <p className="mt-3 font-display text-sm font-semibold text-foreground">
                  {doctor.license}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{doctor.credentials}</p>
              </GlassCard>
              <GlassCard intensity={5} className="rounded-2xl p-5">
                <Languages className="size-5 text-primary" aria-hidden="true" />
                <p className="mt-3 font-display text-sm font-semibold text-foreground">
                  {doctor.languages.join(" · ")}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Consultation languages</p>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white/25 py-20 dark:bg-white/5">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-12">
          <div>
            <SectionHeading align="left" eyebrow="Education" title="Training and degrees" />
            <ul className="mt-8 space-y-4">
              {education.map((item, i) => (
                <Reveal as="li" key={item.degree} delay={i * 70}>
                  <div className="glass-card glass-shine rounded-2xl border border-white/50 p-6 dark:border-white/10">
                    <div className="flex items-start gap-3">
                      <GraduationCap
                        className="mt-0.5 size-5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-display text-sm font-semibold text-foreground">
                          {item.degree}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">{item.institution}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{item.period}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading align="left" eyebrow="Credentials" title="Certifications" />
            <ul className="mt-8 space-y-3">
              {certifications.map((item, i) => (
                <Reveal as="li" key={item} delay={i * 70}>
                  <div className="glass-card glass-shine flex items-start gap-3 rounded-2xl border border-white/50 p-5 dark:border-white/10">
                    <Award className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <SectionHeading eyebrow="Career" title="Professional timeline" />
        <ol className="relative mx-auto mt-12 max-w-3xl space-y-8 border-l border-border pl-8">
          {timeline.map((item, i) => (
            <Reveal as="li" key={`${item.year}-${item.role}`} delay={i * 80} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[7px] mt-1.5 size-3.5 rounded-full border-2 border-background bg-primary"
              />
              <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {item.year}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                {item.role}
              </h3>
              <p className="text-sm text-muted-foreground">{item.place}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      <CallToAction />
      <div className="pb-8" />
    </>
  );
}
