import RegisterPage from '@/components/site/Register';
import { SiteLayout } from '@/components/site/SiteLayout';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <SiteLayout>
            {/* <Hero /> */}
            {/* <MenuSection /> */}
            {/* <About /> */}
            {/* <Testimonials /> */}
            {/* <CTA /> */}
            <RegisterPage />
        </SiteLayout>
    );
}
