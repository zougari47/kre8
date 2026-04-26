import * as React from "react";
import { useForm } from "react-hook-form";

import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";

import { useMutation, useQuery } from "convex/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

const onboardingSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters"),
  bio: z.string().max(160, "Bio must be at most 160 characters").optional(),
});

type OnboardingValues = z.infer<typeof onboardingSchema>;

export function OnboardingForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const navigate = useNavigate();
  const profile = useQuery(api.profiles.getProfile);
  const completeOnboarding = useMutation(api.profiles.completeOnboarding);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      username: "",
      bio: "",
    },
  });

  async function onSubmit(values: OnboardingValues) {
    if (!profile?.userId) {
      toast.error("Profile not found. Please sign in again.");
      return;
    }

    try {
      await completeOnboarding({
        userId: profile.userId,
        username: values.username,
        bio: values.bio,
      });

      toast.success("Profile completed!");
      void navigate({ to: "/dashboard" });
    } catch (error) {
      console.error({ error });
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to complete onboarding",
      );
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>
          Tell us a bit about yourself to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field data-invalid={!!errors.username}>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                aria-invalid={!!errors.username}
                disabled={isSubmitting}
                {...register("username")}
              />
              <FieldDescription>
                This will be your public display name
              </FieldDescription>
              <FieldError errors={[errors.username]} />
            </Field>
            <Field data-invalid={!!errors.bio}>
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <Textarea
                id="bio"
                placeholder="Tell us a little about yourself..."
                aria-invalid={!!errors.bio}
                disabled={isSubmitting}
                rows={4}
                {...register("bio")}
              />
              <FieldDescription>Optional - max 160 characters</FieldDescription>
              <FieldError errors={[errors.bio]} />
            </Field>
            <Field>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Spinner data-icon="inline-start" />}
                Complete Profile
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
