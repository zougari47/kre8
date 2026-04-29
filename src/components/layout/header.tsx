import { NavUser } from "@/components/auth/nav-user";

import { SidebarTrigger } from "@/components/ui/sidebar";

import { ThemeSwitcher } from "@/components/theme-switcher";

export function AppHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
      </div>
      <div className="flex flex-1 items-center justify-end gap-2">
        <ThemeSwitcher />
        <NavUser minimal className="w-fit" />
      </div>
    </header>
  );
}
