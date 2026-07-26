import RegisterPage from '@/components/site/Register';
import { SiteLayout } from '@/components/site/SiteLayout';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
    head: () => ({
        meta: [
            { title: "Register" },
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
            {/* <About /> */}
            {/* <Testimonials /> */}
            {/* <CTA /> */}
            <RegisterPage />
        </SiteLayout>
    );
}
