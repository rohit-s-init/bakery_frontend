import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-pastries.jpg";
import { ArrowRight, Star } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-hero pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blush/40 blur-3xl" />
      <div className="pointer-events-none absolute top-20 -right-32 h-[28rem] w-[28rem] rounded-full bg-peach/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs sm:text-sm text-primary shadow-card">
            <Star size={14} className="fill-caramel text-caramel" />
            <span>Rated #1 Artisan Bakery in Town</span>
          </div>

          <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-primary">
            Every Bite is a
            <span className="block italic text-gradient" style={{ fontFamily: "var(--font-script)" }}>
              Work of Art
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed">
            Handcrafted French-inspired pastries, cakes, and macarons — baked fresh every
            morning with the finest butter, chocolate, and seasonal fruits.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-4 font-medium shadow-soft hover:scale-105 transition-transform"
            >
              Explore the Menu
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full glass px-7 py-4 font-medium text-primary hover:bg-cream transition-colors"
            >
              Our Story
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-6 sm:gap-8">
            <Stat value="12+" label="Years of craft" />
            <div className="h-10 w-px bg-border" />
            <Stat value="80+" label="Signature recipes" />
            <div className="hidden sm:block h-10 w-px bg-border" />
            <Stat value="4.9★" label="Google reviews" className="hidden sm:block" />
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[5/6] rounded-4xl overflow-hidden shadow-glow animate-float">
            <img
              src={heroImg}
              alt="Assortment of artisan French pastries at Pastry Palette"
              width={1600}
              height={1400}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa/20 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-6 -left-4 sm:-left-8 glass rounded-3xl p-4 sm:p-5 shadow-soft max-w-[240px]">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-gradient-warm grid place-items-center text-primary font-display text-lg">
                ✦
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-primary truncate">Fresh Today</p>
                <p className="text-xs text-muted-foreground truncate">Raspberry rose macarons</p>
              </div>
            </div>
          </div>

          <div className="absolute -top-4 -right-2 sm:-right-6 glass rounded-2xl px-4 py-3 shadow-card">
            <p className="font-script text-2xl text-caramel leading-none">Baked with love</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label, className = "" }: { value: string; label: string; className?: string }) {
  return (
    <div className={className}>
      <div className="font-display text-2xl sm:text-3xl text-primary">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
