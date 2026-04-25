import { createFileRoute, Link } from "@tanstack/react-router";

import { buttonVariants } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4">
      <Link to="/signin" className={buttonVariants({ variant: "default" })}>
        Login
      </Link>
      <Link to="/signup" className={buttonVariants({ variant: "outline" })}>
        Signup
      </Link>
    </div>
  );
}
