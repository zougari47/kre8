import * as React from "react";
import { Controller, useForm } from "react-hook-form";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";

import { useMutation, useQuery } from "convex/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const MAX_FILE_SIZE = 250 * 1024; // 250KB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const onboardingSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters"),
  bio: z.string().max(160, "Bio must be at most 160 characters").optional(),
  avatar: z
    .instanceof(FileList)
    .refine(
      (files) => files.length === 0 || files.length === 1,
      "Please select one image",
    )
    .refine(
      (files) => files.length === 0 || (files[0]?.size ?? 0) <= MAX_FILE_SIZE,
      "File size must be less than 250KB",
    )
    .refine(
      (files) =>
        files.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(files[0]?.type ?? ""),
      "Only .jpg, .jpeg, .png, and .webp files are accepted",
    )
    .optional(),
});

type OnboardingValues = z.infer<typeof onboardingSchema>;

export function OnboardingForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const navigate = useNavigate();
  const profile = useQuery(api.profiles.getProfile);
  const completeOnboarding = useMutation(api.profiles.completeOnboarding);
  const generateUploadUrl = useMutation(api.profiles.generateUploadUrl);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingValues>({
    mode: "onChange",
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      username: "",
      bio: "",
      avatar: undefined,
    },
  });

  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);
  const avatarFiles = watch("avatar");

  React.useEffect(() => {
    if (avatarFiles && avatarFiles.length > 0) {
      const file = avatarFiles[0];
      if (!file) return;

      const url = URL.createObjectURL(file);
      setAvatarPreview(url);

      // Cleanup URL when component unmounts or file changes
      return () => URL.revokeObjectURL(url);
    } else {
      setAvatarPreview(null);
    }
  }, [avatarFiles]);

  async function onSubmit(values: OnboardingValues) {
    if (!profile?.userId) {
      toast.error("Profile not found. Please sign in again.");
      return;
    }

    try {
      let avatarStorageId: Id<"_storage"> | undefined;

      if (values.avatar && values.avatar.length > 0) {
        const file = values.avatar[0];

        if (!file) {
          throw new Error("No file selected");
        }

        // Generate upload URL from Convex
        const uploadUrl = await generateUploadUrl();

        // Upload file directly to storage
        const response = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        // Get storage ID from response - it's returned as JSON { storageId: string }
        const result = await response.json();
        avatarStorageId = result.storageId;
      }

      await completeOnboarding({
        userId: profile.userId,
        username: values.username,
        bio: values.bio,
        avatarStorageId,
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
            <Field data-invalid={!!errors.avatar}>
              <FieldLabel htmlFor="avatar">Profile Picture</FieldLabel>
              <div className="flex items-center gap-4">
                <Avatar size="lg">
                  <AvatarImage src={avatarPreview ?? undefined} />
                  <AvatarFallback>{avatarPreview ? "" : "?"}</AvatarFallback>
                </Avatar>
                <Controller
                  control={control}
                  name="avatar"
                  render={({
                    field: { onChange, value: _value, ...field },
                  }) => (
                    <div className="flex-1">
                      <Input
                        id="avatar"
                        type="file"
                        accept={ACCEPTED_IMAGE_TYPES.join(",")}
                        aria-invalid={!!errors.avatar}
                        disabled={isSubmitting}
                        onChange={(e) => onChange(e.target.files)}
                        {...field}
                      />
                      <FieldDescription>
                        Optional - max 250KB, formats: JPG, PNG, WebP
                      </FieldDescription>
                      <FieldError errors={[errors.avatar]} />
                    </div>
                  )}
                />
              </div>
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
