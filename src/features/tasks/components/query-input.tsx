import { InputHTMLAttributes, useEffect, useState } from "react";

import { useNavigate, useSearch } from "@tanstack/react-router";

import { useDebounce } from "@/hooks/use-debounce";

import { Input } from "@/components/ui/input";

type FromS = "/_protected/tasks";
type FromN = "/tasks";

type QueryInputProps = {
  fromS?: FromS;
  fromN?: FromN;
} & InputHTMLAttributes<HTMLInputElement>;

export function QueryInput({
  fromS = "/_protected/tasks",
  fromN = "/tasks",
  ...props
}: QueryInputProps) {
  const navigate = useNavigate({ from: fromN });
  const { q = "" } = useSearch({ from: fromS });

  const [value, setValue] = useState(q);
  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    void navigate({
      search: (prev) => ({
        ...prev,
        q: debouncedValue || undefined,
      }),
    });
  }, [debouncedValue, navigate]);

  return (
    <Input
      {...props}
      type="search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
