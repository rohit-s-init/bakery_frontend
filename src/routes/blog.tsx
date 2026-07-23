import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { CTA } from "@/components/site/CTA";
import macarons from "@/assets/macarons.jpg";
import croissants from "@/assets/croissants.jpg";
import tart from "@/assets/tart.jpg";
import cake from "@/assets/cake.jpg";
import eclair from "@/assets/eclair.jpg";
import interior from "@/assets/bakery-interior.jpg";
import { ArrowRight, CalendarDays } from "lucide-react";

const posts = [
  { img: macarons, cat: "Recipes", title: "The secret to glossy, ruffled macaron feet", date: "Mar 12, 2026", read: "6 min read" },
  { img: croissants, cat: "Craft", title: "Why we let our croissant dough rest for 72 hours", date: "Feb 28, 2026", read: "5 min read" },
  { img: tart, cat: "Seasonal", title: "Spring berries: pairing tarts with the season", date: "Feb 14, 2026", read: "4 min read" },
  { img: cake, cat: "Weddings", title: "Designing a wedding cake, from sketch to slice", date: "Jan 30, 2026", read: "7 min read" },
  { img: eclair, cat: "Chocolate", title: "A quiet obsession with single-origin chocolate", date: "Jan 18, 2026", read: "5 min read" },
  { img: interior, cat: "Behind the scenes", title: "A morning inside our little bakery", date: "Jan 5, 2026", read: "3 min read" },
];

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Pastry Palette" },
      { name: "description", content: "Recipes, technique notes, and stories from behind the counter at Pastry Palette." },
      { property: "og:title", content: "Journal — Pastry Palette" },
      { property: "og:description", content: "Recipes, technique notes and stories from the bakery." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Journal"
        title={<>Stories from <em className="italic text-gradient font-normal">the bakery</em></>}
        subtitle="Recipes, technique, and quiet moments from our kitchen to yours."
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Featured */}
          <article className="group grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center bg-card rounded-4xl overflow-hidden shadow-card hover:shadow-glow transition-shadow">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden">
              <img src={featured.img} alt={featured.title} loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="p-6 sm:p-10">
              <span className="inline-flex items-center rounded-full bg-blush/40 px-3 py-1 text-xs font-medium text-primary">
                {featured.cat}
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl text-primary leading-tight">
                {featured.title}
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                A behind-the-scenes look at the little rituals that make our pastries special —
                from ingredient sourcing to the last dusting of sugar.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><CalendarDays size={14} /> {featured.date}</span>
                <span>· {featured.read}</span>
              </div>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium hover:scale-105 transition-transform shadow-card"
              >
                Read the story <ArrowRight size={16} />
              </Link>
            </div>
          </article>

          {/* Grid */}
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {rest.map((p, i) => (
              <article
                key={p.title}
                className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition-all hover:-translate-y-1"
                style={{ animation: `fade-up 0.7s ${i * 80}ms ease-out both` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <span className="inline-flex items-center rounded-full bg-blush/40 px-3 py-1 text-xs font-medium text-primary">
                    {p.cat}
                  </span>
                  <h3 className="mt-3 font-display text-xl text-primary leading-tight">{p.title}</h3>
                  <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><CalendarDays size={12} /> {p.date}</span>
                    <span>· {p.read}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </SiteLayout>
  );
}
