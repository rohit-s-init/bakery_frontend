import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-cream text-primary font-display text-lg font-bold">P</span>
            <span className="font-display text-2xl">Pastry Palette</span>
          </div>
          <p className="mt-4 max-w-sm text-primary-foreground/70 text-sm leading-relaxed">
            A premium artisan bakery crafting French-inspired pastries, cakes and macarons —
            every bite, a work of art.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="grid h-10 w-10 place-items-center rounded-full bg-cream/10 hover:bg-cream/20 transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg text-primary-foreground">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-primary-foreground transition-colors">About</Link></li>
            <li><Link to="/services" className="hover:text-primary-foreground transition-colors">Services</Link></li>
            <li><Link to="/gallery" className="hover:text-primary-foreground transition-colors">Gallery</Link></li>
            <li><Link to="/blog" className="hover:text-primary-foreground transition-colors">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-primary-foreground">Visit</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            <li>42 Rue de la Boulangerie</li>
            <li>Tue – Sun · 7:30am – 7:00pm</li>
            <li>hello@pastrypalette.co</li>
            <li>+1 (555) 240-8899</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Pastry Palette. Baked with love.</p>
          <p className="font-script text-lg text-cream">Merci for visiting</p>
        </div>
      </div>
    </footer>
  );
}
