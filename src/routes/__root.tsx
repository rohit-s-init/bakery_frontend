import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { UserProvider, useUser } from "@/context/User";
import { LoaderProvider, useLoader } from "@/context/UniversalContext";
import Loader from "@/components/ui/loader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-hero px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-primary">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-primary">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for has wandered off like a warm croissant.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:scale-105 shadow-soft"
          >
            Back to the bakery
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-hero px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold text-primary">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something crumbled. Try again or head back to the bakery.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:scale-105 transition-transform shadow-soft"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Pastry Palette — Every Bite is a Work of Art" },
      { name: "description", content: "Pastry Palette is a premium artisan bakery crafting elegant French pastries, cakes, and macarons — baked fresh daily with love." },
      { name: "author", content: "Pastry Palette" },
      { property: "og:title", content: "Pastry Palette — Every Bite is a Work of Art" },
      { property: "og:description", content: "Pastry Palette is a premium artisan bakery crafting elegant French pastries, cakes, and macarons — baked fresh daily with love." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pastry Palette — Every Bite is a Work of Art" },
      { name: "twitter:description", content: "Pastry Palette is a premium artisan bakery crafting elegant French pastries, cakes, and macarons — baked fresh daily with love." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a5faa7bc-45a1-4f89-97e4-bef80c4fd57b/id-preview-6cf494c9--92d4aed7-4832-4eaf-a5e7-3e564f01125f.lovable.app-1784622804612.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a5faa7bc-45a1-4f89-97e4-bef80c4fd57b/id-preview-6cf494c9--92d4aed7-4832-4eaf-a5e7-3e564f01125f.lovable.app-1784622804612.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=Dancing+Script:wght@500;700&display=swap",
      },
    ],
    scripts: [
      { src: "https://www.googletagmanager.com/gtag/js?id=G-RZTMMPXDT5", async: true },
      { innerHTML: "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-RZTMMPXDT5');" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

export function ContextLaybout({ children }: { children: ReactNode }) {
  const { isLoaderVisible, setIsLoaderVisible } = useLoader();
  const { isUserLoading } = useUser()

  useEffect(() => {
    if (isUserLoading) {
      setIsLoaderVisible(true);
    }
    else {
      setIsLoaderVisible(false);
    }
  }, [isUserLoading])

  return (
    <>
      {children}
      <Loader loading={isLoaderVisible} />
    </>
  )

}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (

    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} >
      <UserProvider>
        <LoaderProvider>
          <ContextLaybout>


            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>


          </ContextLaybout>
        </LoaderProvider>
      </UserProvider>
    </GoogleOAuthProvider>




  );
}
