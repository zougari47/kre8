/// <reference types="vite/client" />
import type { ReactNode } from "react";

import { authClient } from "@/lib/auth/client";
import { getToken } from "@/lib/auth/server";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { QueryClient } from "@tanstack/react-query";
import {
  Outlet,
  HeadContent,
  Scripts,
  useRouteContext,
} from "@tanstack/react-router";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { Toaster } from "@/components/ui/sonner";

import appCss from "@/styles/globals.css?url";

import type { ConvexQueryClient } from "@convex-dev/react-query";

// Get auth information for SSR using available cookies
const getAuth = createServerFn({ method: "GET" }).handler(async () => {
  return await getToken();
});

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  convexQueryClient: ConvexQueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },

      {
        title: "TanStack Start Starter",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  beforeLoad: async (ctx) => {
    const token = await getAuth();

    // all queries, mutations and actions through TanStack Query will be
    // authenticated during SSR if we have a valid token
    if (token) {
      // During SSR only (the only time serverHttpClient exists),
      // set the auth token to make HTTP queries with.
      ctx.context.convexQueryClient.serverHttpClient?.setAuth(token);
    }

    return {
      isAuthenticated: !!token,
      token,
    };
  },
  component: RootComponent,
});

function RootComponent() {
  const context = useRouteContext({ from: Route.id });

  return (
    <ConvexBetterAuthProvider
      client={context.convexQueryClient.convexClient}
      authClient={authClient}
      initialToken={context.token}
    >
      <RootDocument>
        <Outlet />
      </RootDocument>
    </ConvexBetterAuthProvider>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground">
        {children}
        <Toaster />
        <Scripts />
      </body>
    </html>
  );
}
