import { NavUser } from "@/components/auth/nav-user";
import { api } from "@/convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import { Home, LayoutDashboard } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
];

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ context }) => {
    if (!context.isAuthenticated) {
      console.log("not authenticated redirecting to /signin");
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

function SidebarLogo() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <img
      src={isCollapsed ? "/logo-small.svg" : "/logo.svg"}
      alt="Kre8"
      className={cn(
        "transition-all duration-200",
        isCollapsed ? "size-16" : "w-auto",
      )}
    />
  );
}

function ProtectedLayout() {
  const location = useLocation();

  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader className="border-b border-sidebar-border/50 pb-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <Link to="/dashboard">
                <SidebarMenuButton size="lg" className="group/logo">
                  <SidebarLogo />
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="px-2 py-4">
          <SidebarGroup className="p-0">
            <SidebarGroupLabel className="px-3 text-xs font-semibold tracking-wider text-muted-foreground/70 uppercase">
              Menu
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-2 space-y-1">
              <SidebarMenu>
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <Link to={item.url}>
                        <SidebarMenuButton
                          tooltip={item.title}
                          isActive={isActive}
                          className="group/nav-item relative h-11 transition-all"
                        >
                          <item.icon className="size-4" />
                          <span className="font-medium">{item.title}</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <div className="flex flex-1 items-center justify-end gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm">
                Go to Home
              </Button>
            </Link>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
