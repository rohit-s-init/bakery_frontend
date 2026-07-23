import ProfilePage from '@/components/site/Profile'
import { SiteLayout } from '@/components/site/SiteLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
    component: RouteComponent,
})

function RouteComponent() {
    return <SiteLayout>
        {/* <Hero /> */}
        {/* <MenuSection /> */}
        {/* <MyOrders items={items} /> */}
        {/* <MenuSection /> */}
        <ProfilePage/>
        {/* <About />
            <Testimonials />
            <CTA /> */}
    </SiteLayout>
}
