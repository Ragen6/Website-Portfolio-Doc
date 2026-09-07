import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
  youtube: Youtube,
} as const;

interface SocialLinksProps {
  items: readonly { label: string; href: string; icon: keyof typeof icons }[];
  className?: string;
}

export function SocialLinks({ items, className }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {items.map((item) => {
        const Icon = icons[item.icon];
        return (
          <li key={item.label}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={item.label}
              className="glass-card glass-shine inline-flex size-10 items-center justify-center rounded-full border border-white/50 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary dark:border-white/10"
            >
              <Icon className="size-4" aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
