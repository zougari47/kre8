import { authClient } from "@/lib/auth/client";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { Home, LayoutDashboard, LogOut, Settings, User } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      console.log("not authenticated redirecting to /signin");
      throw redirect({ to: "/signin" });
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
        "object-contain transition-all duration-200",
        isCollapsed ? "size-8" : "h-10 w-auto",
      )}
    />
  );
}

function ProtectedLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
    void navigate({ to: "/signin" });
  };

  const userInitials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : session?.user?.email?.[0].toUpperCase() || "U";

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
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <Avatar className="size-8 rounded-lg">
                        <AvatarFallback className="rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {session?.user?.name || "User"}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {session?.user?.email}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  }
                />
                <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="size-8 rounded-lg">
                        <AvatarFallback className="rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {session?.user?.name || "User"}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {session?.user?.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/dashboard">
                    <DropdownMenuItem>
                      <User className="mr-2 size-4" />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/dashboard">
                    <DropdownMenuItem>
                      <Settings className="mr-2 size-4" />
                      Settings
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 size-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
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
