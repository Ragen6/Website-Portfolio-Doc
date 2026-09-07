import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/8 px-3.5 py-1 font-display text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          {eyebrow}
        </span>
      ) : null}
      <Tag className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
        {title}
      </Tag>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </Reveal>
  );
}
