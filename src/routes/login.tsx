import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import { MenuSection } from "@/components/site/Menu";
import { About } from "@/components/site/About";
import { Testimonials } from "@/components/site/Testimonials";
import { CTA } from "@/components/site/CTA";
import LoginPage from "@/components/site/Login";

export const Route = createFileRoute("/login")({
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
      <LoginPage/>
    </SiteLayout>
  );
}
