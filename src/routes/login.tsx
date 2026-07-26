import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import { MenuSection } from "@/components/site/Menu";
import { About } from "@/components/site/About";
import { Testimonials } from "@/components/site/Testimonials";
import { CTA } from "@/components/site/CTA";
import LoginPage from "@/components/site/Login";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login" },
      { name: "description", content: "Meet the pastry chefs, philosophy and story behind Pastry Palette — a premium French-inspired bakery." },
      { property: "og:title", content: "About — Pastry Palette" },
      { property: "og:description", content: "Our story, philosophy and the hands behind every pastry." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      {/* <Hero /> */}
      {/* <MenuSection /> */}
      {/* <About /> */}
      {/* <Testimonials /> */}
      {/* <CTA /> */}
      <LoginPage />
    </SiteLayout>
  );
}
