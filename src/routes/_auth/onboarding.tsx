import { OnboardingForm } from "@/components/auth/onboarding-form";
import { api } from "@/convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/onboarding")({
  component: OnboardingForm,
  beforeLoad: async ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({ to: "/signin" });
    }

    const profile = await context.queryClient.fetchQuery(
      convexQuery(api.profiles.getProfile, {}),
    );

    if (profile?.onBoardingCompleted) {
      throw redirect({ to: "/dashboard" });
    }
  },
});
