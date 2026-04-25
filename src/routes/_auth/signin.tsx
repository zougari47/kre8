import { SigninForm } from "@/components/auth/signin-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/signin")({
  component: SigninForm,
});
