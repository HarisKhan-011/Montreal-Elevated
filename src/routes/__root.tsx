import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { LenisProvider } from "@/lib/lenis-provider";
import { createSeo, SITE_URL } from "@/lib/seo";
import { FlowProvider } from "@/components/site/Flows";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md">
        <div className="eyebrow text-gold">404</div>
        <h1 className="mt-3 font-display text-5xl">Page not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          This door doesn't open. Let's get you back home.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block text-[0.72rem] tracking-[0.22em] uppercase gold-underline"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md">
        <h1 className="font-display text-3xl">Something didn't load.</h1>
        <p className="mt-3 text-sm text-muted-foreground">Try again or head home.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-charcoal text-ivory px-5 py-3 text-[0.72rem] tracking-[0.22em] uppercase"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-border px-5 py-3 text-[0.72rem] tracking-[0.22em] uppercase"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    const seo = createSeo({
      title: "Nachal Realty — Montreal Real Estate, Elevated",
      description:
        "Premium real estate services across Greater Montreal — buying, selling, investing, luxury and commercial. Led by Eli Lallouz.",
    });

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#1f2522" },
        ...seo.meta,
      ],
      links: [
        ...seo.links,
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap",
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Nachal Realty",
    url: SITE_URL,
    image: `${SITE_URL}/og-image.jpg`,
    email: "hello@nachalrealty.com",
    telephone: "+1-514-555-0100",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1 Place Ville Marie",
      addressLocality: "Montréal",
      addressRegion: "QC",
      postalCode: "H3B 2A7",
      addressCountry: "CA",
    },
    areaServed: "Greater Montreal",
  };

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <LenisProvider>
        <FlowProvider>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </FlowProvider>
      </LenisProvider>
    </QueryClientProvider>
  );
}
