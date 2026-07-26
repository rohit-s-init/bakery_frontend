import { MenuSection } from '@/components/site/Menu'
import { SiteLayout } from '@/components/site/SiteLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/menu')({
  head: () => ({
    meta: [
      { title: "Menu" },
      { name: "description", content: "Meet the pastry chefs, philosophy and story behind Pastry Palette — a premium French-inspired bakery." },
      { property: "og:title", content: "About — Pastry Palette" },
      { property: "og:description", content: "Our story, philosophy and the hands behind every pastry." },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
    return (
        <SiteLayout>
            {/* <Hero /> */}
            {/* <MenuSection /> */}
            {/* <MyOrders items={items} /> */}
            <MenuSection />
            {/* <About />
          <Testimonials />
          <CTA /> */}
        </SiteLayout>
    )
}
