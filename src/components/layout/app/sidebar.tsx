import { NavUser } from "@/components/auth/nav-user";
import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

import { sidebarData } from "./data";
import { NavGroup } from "./nav-group";

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
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
