import { MenuSection } from '@/components/site/Menu'
import { SiteLayout } from '@/components/site/SiteLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/menu')({
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
