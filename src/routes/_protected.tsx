import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      console.log("not autenticated redirecting to /sign-in");
      console.log({ context });
      throw redirect({ to: "/login" });
    }
  },
  component: () => {
    return <Outlet />;
  },
});
