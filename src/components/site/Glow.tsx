import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

/**
 * Blurred white/blue "bloom" rendered behind a glass surface to lift it from
 * the page. Place it as a sibling of the glass element inside a `relative`
 * wrapper so it sits behind while extending slightly beyond the edges.
 */
export function Glow({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -inset-2 rounded-[2rem] bg-linear-to-r",
        "from-sky-200/60 via-white/40 to-blue-200/60 blur-2xl",
        "dark:from-sky-600/20 dark:via-white/5 dark:to-blue-600/20",
        className,
      )}
      {...props}
    />
  );
}
