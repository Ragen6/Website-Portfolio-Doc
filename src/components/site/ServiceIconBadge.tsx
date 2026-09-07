import {
  Activity,
  Heart,
  Microscope,
  Stethoscope,
  Syringe,
  Video,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIcon } from "@/content/site";

const map: Record<ServiceIcon, LucideIcon> = {
  stethoscope: Stethoscope,
  heart: Heart,
  activity: Activity,
  microscope: Microscope,
  syringe: Syringe,
  video: Video,
};

export function ServiceIconBadge({ icon }: { icon: ServiceIcon }) {
  const Icon = map[icon];
  return (
    <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
      <Icon className="size-6" aria-hidden="true" />
    </span>
  );
}
