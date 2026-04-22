import * as React from "react";

import { authClient } from "@/lib/auth/client";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export function SigninForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [isPending, setIsPending] = React.useState(false);
  const navigate = useNavigate();

  async function handleTestSignin() {
    setIsPending(true);
    const { error } = await authClient.signIn.email({
      email: "test@gmail.com",
      password: "12345678",
      callbackURL: "/dashboard",
    });

    setIsPending(false);

    if (error) {
      toast.error(error.message || "Failed to sign in");
      return;
    }

    toast.success("Signed in successfully!");
    void navigate({ to: "/dashboard" });
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Click the button below to sign in with test credentials
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button onClick={handleTestSignin} disabled={isPending}>
          {isPending && <Spinner data-icon="inline-start" />}
          Sign in as Test User
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => authClient.signIn.social({ provider: "google" })}
        >
          Sign in with Google
        </Button>
      </CardContent>
    </Card>
  );
}
