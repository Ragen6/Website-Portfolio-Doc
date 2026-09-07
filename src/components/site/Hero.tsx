import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountUp } from "./CountUp";
import { GlassCard } from "./GlassCard";
import { Glow } from "./Glow";
import { Reveal } from "./Reveal";
import { doctor, stats } from "@/content/site";

export function Hero() {
  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-12 lg:pb-24 lg:pt-16">
        <div className="relative">
          <Reveal>
            <span className="relative inline-flex">
              <Glow className="!rounded-full opacity-60" />
              <span className="glass-card glass-shine relative inline-flex items-center gap-2 rounded-full border border-primary/20 px-3.5 py-1.5 text-xs font-medium text-primary">
                <ShieldCheck className="size-3.5" aria-hidden="true" />
                {doctor.credentials}
              </span>
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {doctor.name}
            </h1>
            <p className="mt-3 font-display text-lg font-medium text-primary sm:text-xl">
              {doctor.specialization}
            </p>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {doctor.intro}
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="glass" className="rounded-full">
              <Link to="/about">
                Learn more
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <Reveal delay={120} className="relative">
          <div className="relative mx-auto max-w-md">
            <GlassCard
              tilt={false}
              className="rounded-[2rem] border border-white/50 shadow-[var(--shadow-lift)] dark:border-white/10"
            >
              <img
                src={doctor.portrait}
                alt={`${doctor.name}, ${doctor.specialization}`}
                width={912}
                height={1104}
                fetchPriority="high"
                className="w-full rounded-[2rem] object-cover"
              />
            </GlassCard>
            <div className="absolute -bottom-5 -left-4 sm:-left-8">
              <Glow className="!rounded-2xl opacity-60" />
              <div className="glass-card glass-shine relative rounded-2xl px-4 py-3">
                <p className="flex items-center gap-1.5 font-display text-sm font-semibold text-foreground">
                  <Star className="size-4 fill-primary text-primary" aria-hidden="true" />
                  Patient rated care
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  General practice and emergency care
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-12 lg:pb-20">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal as="li" key={stat.label} delay={i * 90}>
              <div className="relative h-full">
                <Glow className="!rounded-2xl opacity-50" />
                <div className="glass-card glass-shine relative h-full rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
                  <p className="font-display text-3xl font-semibold text-primary sm:text-4xl">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
