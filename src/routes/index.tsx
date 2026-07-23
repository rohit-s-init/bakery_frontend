import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import { MenuSection } from "@/components/site/Menu";
import { About } from "@/components/site/About";
import { Testimonials } from "@/components/site/Testimonials";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <MenuSection />
      <About />
      <Testimonials />
      <CTA />
    </SiteLayout>
  );
}
