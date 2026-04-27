import { SettingsForm } from "@/components/settings/settings-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/settings")({
  component: SettingsForm,
});
