import { authClient } from "@/lib/auth/client";
import { useNavigate } from "@tanstack/react-router";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export function NavUser() {
  const { data: session, isPending } = authClient.useSession();
  const navigate = useNavigate();
  const { isMobile } = useSidebar();

  const { name, email } = session?.user ?? {};

  const userAvatar = session?.user?.image || "";
  const userInitials = session?.user?.name[0]?.toUpperCase();

  async function signout() {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message || "Faild to singout!");
      return;
    }

    void navigate({ to: "/signin" });
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {isPending ? (
                  <Skeleton className="h-full w-full rounded-lg bg-sidebar-foreground/20" />
                ) : (
                  <>
                    <AvatarImage src={userAvatar} alt={name} />
                    <AvatarFallback className="rounded-lg">
                      {userInitials}
                    </AvatarFallback>
                  </>
                )}
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                {isPending ? (
                  <>
                    <Skeleton className="mb-1 h-4 w-24 bg-sidebar-foreground/20" />
                    <Skeleton className="h-3 w-32 bg-sidebar-foreground/20" />
                  </>
                ) : (
                  <>
                    <span className="truncate font-medium">{name}</span>
                    <span className="truncate text-xs">{email}</span>
                  </>
                )}
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--anchor-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    {isPending ? (
                      <Skeleton className="h-full w-full rounded-lg" />
                    ) : (
                      <>
                        <AvatarImage src={userAvatar} alt={name} />
                        <AvatarFallback className="rounded-lg">
                          {userInitials}
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    {isPending ? (
                      <>
                        <Skeleton className="mb-1 h-4 w-24" />
                        <Skeleton className="h-3 w-32" />
                      </>
                    ) : (
                      <>
                        <span className="truncate font-medium">{name}</span>
                        <span className="truncate text-xs">{email}</span>
                      </>
                    )}
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={signout}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
