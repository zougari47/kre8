import {
  LayoutDashboard,
  ListTodo,
  HelpCircle,
  Settings,
  UserCog,
} from "lucide-react";

import { type SidebarData } from "./types";

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: "General",
      items: [
        { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
        { title: "Tasks", url: "/tasks", icon: ListTodo },
        // { title: "Apps", url: "/_protected/apps", icon: Package },
        // { title: "Chats", url: "/_protected/chats", badge: "3", icon: MessagesSquare },
        // { title: "Users", url: "/_protected/users", icon: Users },
        // {
        //   title: "Secured by Clerk",
        //   icon: ClerkLogo,
        //   items: [
        //     { title: "Sign In", url: "/_protected/sign-in" },
        //     { title: "Sign Up", url: "/_protected/sign-up" },
        //     { title: "User Management", url: "/_protected/user-management" },
        //   ],
        // },
      ],
    },
    {
      title: "Pages",
      items: [
        // {
        //   title: "Auth",
        //   icon: ShieldCheck,
        //   items: [
        //     { title: "Sign In", url: "/_protected/sign-in" },
        //     { title: "Sign In (2 Col)", url: "/_protected/sign-in-2col" },
        //     { title: "Sign Up", url: "/_protected/sign-up" },
        //     { title: "Forgot Password", url: "/_protected/forgot-password" },
        //     { title: "OTP", url: "/_protected/otp" },
        //   ],
        // },
        // {
        //   title: "Errors",
        //   icon: Bug,
        //   items: [
        //     { title: "Unauthorized", url: "/_protected/unauthorized", icon: Lock },
        //     { title: "Forbidden", url: "/_protected/forbidden", icon: UserX },
        //     { title: "Not Found", url: "/_protected/not-found", icon: FileX },
        //     {
        //       title: "Internal Server Error",
        //       url: "/_protected/internal-server-error",
        //       icon: ServerOff,
        //     },
        //     {
        //       title: "Maintenance Error",
        //       url: "/_protected/maintenance-error",
        //       icon: Construction,
        //     },
        //   ],
        // },
      ],
    },
    {
      title: "Other",
      items: [
        {
          title: "Settings",
          icon: Settings,
          items: [
            { title: "Profile", url: "/settings", icon: UserCog },
            // { title: "Account", url: "/_protected/account", icon: Wrench },
            // { title: "Appearance", url: "/_protected/appearance", icon: Palette },
            // { title: "Notifications", url: "/_protected/notifications", icon: Bell },
            // { title: "Display", url: "/_protected/display", icon: Monitor },
          ],
        },
        {
          title: "Help Center",
          url: "/_protected/help-center",
          icon: HelpCircle,
        },
      ],
    },
  ],
};
