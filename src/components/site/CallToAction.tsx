import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Glow } from "./Glow";
import { Reveal } from "./Reveal";
import { whatsappLink } from "@/content/site";

export function CallToAction({
  title = "Ready to talk about your health?",
  description = "Book a consultation or send a message — you will get a clear answer about next steps.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-12">
      <Reveal className="relative">
        <Glow className="!rounded-3xl" />
        <div className="glass-card glass-shine relative overflow-hidden rounded-3xl px-6 py-14 text-center shadow-[var(--shadow-lift)] sm:px-14">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="glass" className="rounded-full">
              <a href={whatsappLink} target="_blank" rel="noreferrer noopener">
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
