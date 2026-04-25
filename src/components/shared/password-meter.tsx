import { cn } from "@/lib/utils";

export type PasswordScore = 0 | 1 | 2 | 3 | 4;

interface PasswordMeterProps extends React.ComponentProps<"div"> {
  score: PasswordScore;
}

const scoreConfig = {
  0: {
    label: "",
    color: "bg-muted",
    textColor: "text-muted-foreground",
  },
  1: {
    label: "Very weak",
    color: "bg-destructive",
    textColor: "text-destructive",
  },
  2: {
    label: "Weak",
    color: "bg-orange-500",
    textColor: "text-orange-500",
  },
  3: {
    label: "Medium",
    color: "bg-yellow-500",
    textColor: "text-yellow-500",
  },
  4: {
    label: "Strong",
    color: "bg-green-500",
    textColor: "text-green-500",
  },
};

export function getPasswordScore(password: string): PasswordScore {
  if (password.length === 0) return 0;

  let criteria = 0;
  if (password.length >= 8) criteria++;
  if (/[a-z]/.test(password)) criteria++;
  if (/[A-Z]/.test(password)) criteria++;
  if (/\d/.test(password)) criteria++;
  if (/[^a-zA-Z0-9]/.test(password)) criteria++;

  if (criteria <= 2 || password.length < 8) return 1;
  if (criteria <= 3) return 2;
  if (criteria <= 4) return 3;
  return 4;
}

export function PasswordMeter({ score, className }: PasswordMeterProps) {
  const config = scoreConfig[score];

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-all duration-300",
              step <= score ? config.color : "bg-muted",
            )}
          />
        ))}
      </div>
      {config.label && (
        <p
          className={cn(
            "text-xs font-medium",
            config.textColor,
            !config.label && "invisible",
          )}
        >
          {config.label}
        </p>
      )}
    </div>
  );
}
