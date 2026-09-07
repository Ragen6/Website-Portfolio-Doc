import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import { Glow } from "@/components/site/Glow";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SocialLinks } from "@/components/site/SocialLinks";
import { Turnstile } from "@/components/site/Turnstile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { submitContactRequest } from "@/lib/contact.functions";
import { contact, doctor, socials, whatsappLink } from "@/content/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact & Appointments — ${doctor.name}` },
      {
        name: "description",
        content: `Book an appointment or reach ${doctor.name} by phone, WhatsApp or email. Working hours, address and contact form.`,
      },
      { property: "og:title", content: `Contact & Appointments — ${doctor.name}` },
      {
        property: "og:description",
        content: "Book an appointment by phone, WhatsApp, email or the contact form.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const submit = useServerFn(submitContactRequest);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      turnstileToken: "",
      website: "",
      formStartedAt: Date.now(),
    },
  });
  const turnstileSiteKey = import.meta.env["VITE_TURNSTILE_SITE_KEY"] ?? "";
  const turnstileToken = watch("turnstileToken");
  const subjectRegistration = register("subject");

  const mutation = useMutation({
    mutationFn: (data: ContactInput) => submit({ data }),
    onSuccess: () => {
      toast.success("Message sent", {
        description: "You will receive a reply shortly.",
      });
      reset({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        turnstileToken: "",
        website: "",
        formStartedAt: Date.now(),
      });
    },
    onError: () => {
      toast.error("Something went wrong", {
        description: "Please try again, or reach out on WhatsApp.",
      });
    },
  });

  return (
    <>
      <section className="hero-gradient">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="Get in touch"
            description="Send us a message or reach out directly."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="relative">
            <Glow className="!rounded-3xl opacity-50" />
            <form
              onSubmit={handleSubmit((data) => mutation.mutate(data))}
              noValidate
              className="glass-card glass-shine relative rounded-3xl border border-white/50 p-7 shadow-[var(--shadow-soft)] sm:p-9 dark:border-white/10"
            >
              <h2 className="font-display text-lg font-semibold text-foreground">Send a request</h2>
              <input type="hidden" {...register("formStartedAt", { valueAsNumber: true })} />
              <div
                aria-hidden="true"
                className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
              >
                <Label htmlFor="website">Website</Label>
                <Input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="group">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    className="mt-2"
                    autoComplete="name"
                    maxLength={80}
                    aria-invalid={Boolean(errors.name)}
                    {...register("name")}
                  />
                  <p className="mt-1.5 hidden text-xs text-muted-foreground group-focus-within:block">
                    Up to 12 words and 80 characters.
                  </p>
                  {errors.name ? (
                    <p className="mt-1.5 text-xs text-destructive">{errors.name.message}</p>
                  ) : null}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    className="mt-2"
                    autoComplete="email"
                    maxLength={255}
                    aria-invalid={Boolean(errors.email)}
                    {...register("email")}
                  />
                  {errors.email ? (
                    <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>
                  ) : null}
                </div>
                <div className="group">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    className="mt-2"
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="[0-9+() .-]*"
                    maxLength={30}
                    aria-invalid={Boolean(errors.phone)}
                    {...register("phone")}
                  />
                  <p className="mt-1.5 hidden text-xs text-muted-foreground group-focus-within:block">
                    Maximum 30 characters.
                  </p>
                  {errors.phone ? (
                    <p className="mt-1.5 text-xs text-destructive">{errors.phone.message}</p>
                  ) : null}
                </div>
                <div className="group">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    className="mt-2"
                    inputMode="text"
                    pattern="[^0-9]*"
                    maxLength={300}
                    aria-invalid={Boolean(errors.subject)}
                    {...subjectRegistration}
                    onChange={(event) => {
                      event.currentTarget.value = event.currentTarget.value.replace(/\d/g, "");
                      subjectRegistration.onChange(event);
                    }}
                  />
                  <p className="mt-1.5 hidden text-xs text-muted-foreground group-focus-within:block">
                    Text only: maximum 20 words and 300 characters.
                  </p>
                  {errors.subject ? (
                    <p className="mt-1.5 text-xs text-destructive">{errors.subject.message}</p>
                  ) : null}
                </div>
              </div>

              <div className="group mt-5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={6}
                  className="mt-2"
                  maxLength={25600}
                  aria-invalid={Boolean(errors.message)}
                  {...register("message")}
                />
                <p className="mt-1.5 hidden text-xs text-muted-foreground group-focus-within:block">
                  Maximum 256 words, with up to 100 characters per word.
                </p>
                {errors.message ? (
                  <p className="mt-1.5 text-xs text-destructive">{errors.message.message}</p>
                ) : null}
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium text-foreground">Security check</p>
                {turnstileSiteKey ? (
                  <div className="mt-2">
                    <Turnstile
                      siteKey={turnstileSiteKey}
                      onToken={(token) =>
                        setValue("turnstileToken", token, { shouldValidate: true })
                      }
                    />
                    {errors.turnstileToken ? (
                      <p className="mt-1.5 text-xs text-destructive">
                        {errors.turnstileToken.message}
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-destructive" role="alert">
                    The contact form is temporarily unavailable while its security check is being
                    configured.
                  </p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="mt-7 w-full rounded-full sm:w-auto"
                disabled={mutation.isPending || !turnstileSiteKey || !turnstileToken}
              >
                <Send className="size-4" aria-hidden="true" />
                {mutation.isPending ? "Sending…" : "Send request"}
              </Button>
            </form>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={80} className="relative">
              <Glow className="!rounded-3xl opacity-50" />
              <div className="glass-card glass-shine relative rounded-3xl p-7">
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Direct contact
                </h2>
                <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <a href={`tel:${contact.phone}`} className="hover:text-primary">
                      {contact.phone}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <MessageCircle
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:text-primary"
                    >
                      WhatsApp
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <a href={`mailto:${contact.email}`} className="hover:text-primary">
                      {contact.email}
                    </a>
                  </li>
                </ul>
                <SocialLinks className="mt-6" items={socials} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
