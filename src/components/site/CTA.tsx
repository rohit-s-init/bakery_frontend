import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-4xl bg-primary text-primary-foreground p-10 sm:p-16 shadow-glow">
          <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-blush/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-peach/20 blur-3xl" />
          <div className="relative grid lg:grid-cols-[1.5fr_1fr] gap-8 items-center">
            <div>
              <p className="font-script text-2xl text-cream">Ready when you are</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl leading-tight text-primary-foreground">
                Let's plan something delicious together
              </h2>
              <p className="mt-4 max-w-xl text-primary-foreground/70">
                Custom cakes, event catering, or a simple pickup order — we'd love to bake for you.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-cream text-primary px-7 py-4 font-medium shadow-soft hover:scale-105 transition-transform"
              >
                Get in touch
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center rounded-full border border-cream/30 px-7 py-4 font-medium text-primary-foreground hover:bg-cream/10 transition-colors"
              >
                View services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
