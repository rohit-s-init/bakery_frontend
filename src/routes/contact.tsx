import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Contact } from "@/components/site/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Pastry Palette" },
      { name: "description", content: "Get in touch to reserve, order custom cakes, or ask us anything. We reply within a day." },
      { property: "og:title", content: "Contact — Pastry Palette" },
      { property: "og:description", content: "Reserve, order custom cakes, or plan an event with Pastry Palette." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Say bonjour"
        title={<>Come by, or <em className="italic text-gradient font-normal">drop us a note</em></>}
        subtitle="Reservations, custom orders, and event enquiries — we'd love to hear from you."
      />
      <Contact compact />
    </SiteLayout>
  );
}
