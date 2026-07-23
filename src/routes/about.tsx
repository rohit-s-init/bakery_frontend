import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { About } from "@/components/site/About";
import { Testimonials } from "@/components/site/Testimonials";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Pastry Palette" },
      { name: "description", content: "Meet the pastry chefs, philosophy and story behind Pastry Palette — a premium French-inspired bakery." },
      { property: "og:title", content: "About — Pastry Palette" },
      { property: "og:description", content: "Our story, philosophy and the hands behind every pastry." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Our Story"
        title={<>A love letter to <em className="italic text-gradient font-normal">French patisserie</em></>}
        subtitle="Since 2013, we've been baking with butter, patience, and a lot of love."
      />
      <About />
      <Testimonials />
      <CTA />
    </SiteLayout>
  );
}
