import { AppHeader, AppSidebar } from "@/components/layout/app";
import { api } from "@/convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({ to: "/signin" });
    }

    const profile = await context.queryClient.fetchQuery(
      convexQuery(api.profiles.getProfile),
    );

    if (!profile?.onBoardingCompleted) {
      throw redirect({ to: "/onboarding" });
    }
  },
  component: ProtectedLayout,
});

function ProtectedLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
