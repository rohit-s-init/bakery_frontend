import chef from "@/assets/chef.jpg";
import interior from "@/assets/bakery-interior.jpg";
import { Leaf, Croissant, HeartHandshake } from "lucide-react";

const features = [
  { icon: Leaf, title: "Seasonal & Local", desc: "Fresh fruits, dairy, and grains sourced from local farms." },
  { icon: Croissant, title: "French Technique", desc: "Slow-fermented doughs and classical patisserie methods." },
  { icon: HeartHandshake, title: "Made with Love", desc: "Every pastry is shaped and finished by hand." },
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-gradient-warm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative">
          <div className="relative aspect-[4/5] rounded-4xl overflow-hidden shadow-soft">
            <img src={chef} alt="Head pastry chef" loading="lazy" width={900} height={1200}
              className="h-full w-full object-cover" />
          </div>
          <div className="hidden sm:block absolute -bottom-8 -right-6 w-56 aspect-square rounded-3xl overflow-hidden shadow-glow border-4 border-cream">
            <img src={interior} alt="Bakery interior" loading="lazy" width={1400} height={1000}
              className="h-full w-full object-cover" />
          </div>
        </div>

        <div>
          <p className="font-script text-3xl text-caramel">Our Story</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl text-primary leading-tight">
            A love letter to French patisserie
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Pastry Palette was born from a simple idea — that a beautiful pastry can turn an
            ordinary morning into a small celebration. Our head chef trained in Lyon and Paris,
            bringing decades of French technique to our little corner bakery.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Every day begins before sunrise with hand-laminated doughs, tempered chocolate, and
            fresh cream — because craft cannot be rushed.
          </p>

          <div className="mt-10 grid sm:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="glass rounded-2xl p-5 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground">
                  <f.icon size={20} />
                </div>
                <h3 className="mt-4 font-display text-lg text-primary">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
