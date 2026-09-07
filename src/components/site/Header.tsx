import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { doctor } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-3 lg:px-8">
      <div
        className={cn(
          "relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 rounded-2xl border border-white/60 bg-background px-5 shadow-[var(--shadow-soft)] transition-all duration-300 dark:border-white/10 lg:rounded-full lg:px-6",
          scrolled && "shadow-[var(--shadow-lift)]",
        )}
      >
        <Link to="/" className="relative z-10 flex items-center gap-2.5" aria-label="Home">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
            <Activity className="size-5" aria-hidden="true" />
          </span>
          <span className="font-display text-base font-semibold tracking-tight text-foreground">
            {doctor.shortName}
          </span>
        </Link>

        <nav className="relative z-10 hidden items-center gap-1 lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/8 hover:text-primary"
              activeProps={{ className: "text-primary bg-primary/10" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="glass-card mx-auto mt-2 max-w-6xl rounded-2xl px-5 pb-6 pt-2 lg:hidden"
        >
          <nav className="grid gap-1" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/8 hover:text-primary"
                activeProps={{ className: "text-primary bg-primary/10" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
