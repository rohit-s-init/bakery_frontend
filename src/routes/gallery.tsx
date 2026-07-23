import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Gallery } from "@/components/site/Gallery";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Pastry Palette" },
      { name: "description", content: "A visual feast of cakes, pastries and moments from the Pastry Palette bakery." },
      { property: "og:title", content: "Gallery — Pastry Palette" },
      { property: "og:description", content: "Explore our gallery of handcrafted pastries, cakes and bakery moments." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Gallery"
        title={<>A palette of <em className="italic text-gradient font-normal">little masterpieces</em></>}
        subtitle="Fresh from the counter, the ovens and the celebrations we've been part of."
      />
      <Gallery />
      <CTA />
    </SiteLayout>
  );
}
