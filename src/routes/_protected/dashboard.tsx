import { authClient } from "@/lib/auth/client";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Spinner } from "@/components/ui/spinner";

export const Route = createFileRoute("/_protected/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <Spinner />;

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>

      <div className="space-y-2">
        <p>
          <strong>Name:</strong> {session?.user.name}
        </p>
        <p>
          <strong>Email:</strong> {session?.user.email}
        </p>
      </div>
      <button
        className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
        onClick={async () => {
          await authClient.signOut();
          void navigate({ to: "/signin" });
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
