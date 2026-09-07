import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Glow } from "./Glow";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  glowClassName?: string;
  intensity?: number;
  tilt?: boolean;
  disabled?: boolean;
}

function usesReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Liquid-glass surface with a blurred glow bloom, top-light gradient, inset
 * edge highlight and an interactive 3D tilt with a pointer-tracked light
 * reflection (adapted from einui's GlassMorphCard).
 */
export function GlassCard({
  children,
  className,
  wrapperClassName,
  glowClassName,
  intensity = 10,
  tilt = true,
  disabled = false,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [light, setLight] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (usesReducedMotion()) {
      setTransform({ rotateX: 0, rotateY: 0 });
      setHovered(false);
    }
  }, []);

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const node = ref.current;
      if (!node || disabled || usesReducedMotion()) return;
      const rect = node.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      if (tilt) {
        setTransform({
          rotateX: ((y - cy) / cy) * -intensity,
          rotateY: ((x - cx) / cx) * intensity,
        });
      }
      setLight({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    },
    [intensity, tilt, disabled],
  );

  const onMouseEnter = useCallback(() => setHovered(true), []);
  const onMouseLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setLight({ x: 50, y: 50 });
    setHovered(false);
  }, []);

  return (
    <div className={cn("relative", wrapperClassName)} style={{ perspective: "1000px" }}>
      <Glow
        className={cn(
          "transition-opacity duration-500",
          hovered ? "opacity-55" : "opacity-30",
          glowClassName,
        )}
      />
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={cn(
          "glass-card relative overflow-hidden shadow-[var(--shadow-soft)]",
          "transition-transform duration-200 ease-out will-change-transform",
          tilt && !disabled && !usesReducedMotion() && "cursor-pointer",
          className,
        )}
        style={{
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${light.x}% ${light.y}%, rgba(255,255,255,0.5) 0%, transparent 55%)`,
            opacity: hovered ? 1 : 0,
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/40 to-transparent dark:from-white/10" />
        <div className="relative z-10" style={{ transform: "translateZ(24px)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
