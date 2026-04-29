import { NavUser } from "@/components/auth/nav-user";
import { Link, useLocation } from "@tanstack/react-router";
import { Home, LayoutDashboard } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
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

export function AppSidebar() {
  const location = useLocation();

  return (
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
  );
}
