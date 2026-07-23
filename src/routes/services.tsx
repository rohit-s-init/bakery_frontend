import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { MenuSection } from "@/components/site/Menu";
import { CTA } from "@/components/site/CTA";
import { Cake, Gift, Coffee, PartyPopper, ArrowRight } from "lucide-react";

const services = [
  {
    Icon: Cake,
    title: "Custom Wedding Cakes",
    price: "From $220",
    desc: "Hand-designed tiered cakes with sugar florals, buttercream ruffles, and seasonal fillings tailored to your day.",
  },
  {
    Icon: PartyPopper,
    title: "Celebration & Birthday Cakes",
    price: "From $58",
    desc: "Personalised cakes for every milestone — with 48-hour notice, we craft flavours you'll remember.",
  },
  {
    Icon: Gift,
    title: "Gift Boxes & Hampers",
    price: "From $32",
    desc: "Beautifully wrapped assortments of macarons, chocolates and viennoiseries, delivered locally.",
  },
  {
    Icon: Coffee,
    title: "Event & Corporate Catering",
    price: "Custom quote",
    desc: "Dessert tables, coffee bars, and pastry platters for launches, brunches and private events.",
  },
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Menu — Pastry Palette" },
      { name: "description", content: "Custom cakes, gift boxes, catering and our daily pastry menu at Pastry Palette." },
      { property: "og:title", content: "Services — Pastry Palette" },
      { property: "og:description", content: "Custom cakes, gift boxes, and event catering — plus our daily menu." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="What we bake"
        title={<>Services crafted <em className="italic text-gradient font-normal">around you</em></>}
        subtitle="From daily pastries to bespoke celebration cakes — every order gets the same care."
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid sm:grid-cols-2 gap-6 lg:gap-8">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="group relative overflow-hidden rounded-3xl bg-card p-8 shadow-card hover:shadow-glow transition-all hover:-translate-y-1"
              style={{ animation: `fade-up 0.7s ${i * 80}ms ease-out both` }}
            >
              <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-blush/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative grid grid-cols-[auto_minmax(0,1fr)] items-start gap-5">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-warm text-primary shadow-card">
                  <s.Icon size={24} />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="font-display text-2xl text-primary">{s.title}</h3>
                    <span className="text-sm font-medium text-caramel">{s.price}</span>
                  </div>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{s.desc}</p>
                  <Link
                    to="/contact"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
                  >
                    Enquire <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <MenuSection />
      <CTA />
    </SiteLayout>
  );
}
