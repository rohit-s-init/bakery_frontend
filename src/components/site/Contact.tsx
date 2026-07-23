import { MapPin, Clock, Phone, Mail, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  occasion: z.string().trim().max(120, "Keep occasion under 120 chars").optional(),
  message: z.string().trim().min(5, "Message must be at least 5 characters").max(1000, "Message is too long"),
});

type Errors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

export function Contact({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      occasion: String(fd.get("occasion") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof Errors;
        if (!errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
  };

  return (
    <section id="contact" className={compact ? "py-16" : "py-24 md:py-32"}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div>
          <p className="font-script text-3xl text-caramel">Visit Us</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl text-primary leading-tight">
            Come by for a warm croissant
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md">
            We'd love to welcome you. Stop in for a coffee and a pastry, or order ahead for pickup
            and custom celebrations.
          </p>

          <ul className="mt-10 space-y-5">
            {[
              { Icon: MapPin, title: "Location", value: "42 Rue de la Boulangerie, Old Town" },
              { Icon: Clock, title: "Hours", value: "Tue – Sun · 7:30am – 7:00pm" },
              { Icon: Phone, title: "Phone", value: "+1 (555) 240-8899" },
              { Icon: Mail, title: "Email", value: "hello@pastrypalette.co" },
            ].map(({ Icon, title, value }) => (
              <li key={title} className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-warm text-primary shadow-card">
                  <Icon size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm text-muted-foreground">{title}</div>
                  <div className="font-medium text-primary break-words">{value}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="glass rounded-4xl p-6 sm:p-10 shadow-soft"
        >
          {sent ? (
            <div className="text-center py-10 animate-fade-up">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-warm text-primary shadow-card">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="mt-6 font-display text-2xl text-primary">Merci beaucoup!</h3>
              <p className="mt-2 text-muted-foreground">Your message is on its way. We'll reply within a day.</p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 inline-flex items-center rounded-full border border-border bg-card px-5 py-2.5 text-sm text-primary hover:bg-accent transition-colors"
              >
                Send another
              </button>
            </div>
          ) : (
            <>
              <h3 className="font-display text-2xl text-primary">Reserve or send us a note</h3>
              <p className="mt-1 text-sm text-muted-foreground">We reply within a day, always with a smile.</p>

              <div className="mt-6 grid gap-4">
                <Field label="Your name" name="name" placeholder="Jane Doe" error={errors.name} />
                <Field label="Email" name="email" type="email" placeholder="jane@example.com" error={errors.email} />
                <Field label="Occasion (optional)" name="occasion" required={false} placeholder="Birthday, wedding, just because…" error={errors.occasion} />
                <div>
                  <label htmlFor="message" className="text-sm font-medium text-primary">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    maxLength={1000}
                    placeholder="Tell us what you're dreaming of…"
                    className="mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 py-4 font-medium shadow-soft hover:scale-[1.02] transition-transform"
                >
                  Send message
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", placeholder, error, required = true,
}: { label: string; name: string; type?: string; placeholder?: string; error?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-primary">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        maxLength={255}
        placeholder={placeholder}
        className="mt-2 w-full rounded-full border border-border bg-card px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
