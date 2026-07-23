import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import Loader from "../ui/loader";
import { LoaderProvider, useLoader } from "@/context/UniversalContext";
import { UserProvider, useUser } from "@/context/User";





export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">

      {/* <LoaderProvider>
        <ContextLaybout> */}

          <Navbar />
          {children}
          <Footer />

        {/* </ContextLaybout>
      </LoaderProvider> */}

    </main>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-hero pt-36 pb-16 md:pt-44 md:pb-24">
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blush/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-peach/40 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center animate-fade-up">
        <p className="font-script text-2xl sm:text-3xl text-caramel">{eyebrow}</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl md:text-6xl text-primary leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
