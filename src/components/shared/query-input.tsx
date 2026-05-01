import { InputHTMLAttributes, useEffect, useState } from "react";

import { useDebounce } from "@/hooks/use-debounce";

import { Input } from "@/components/ui/input";

type QueryInputProps = {
  routeApi: {
    useSearch: () => { q?: string };
    useNavigate: () => (opts: {
      search: (prev: { q?: string }) => { q?: string };
    }) => void;
  };
} & InputHTMLAttributes<HTMLInputElement>;

/**
 * A search input component
 * It allows users to search by typing into the input field, and debounces the input
 * It update the search params in the current Route ?q={value}
 *
 * @generic TSearch - The type of search parameters, which typically includes a 'q' string field
 * @param {QueryRouteApi<TSearch>} routeApi
 *
 * ex:
 * const routeAPI = getRouteApi("/_protected/dashboard");
 * <QueryInput routeApi={routeAPI} />
 */

export function QueryInput({ routeApi, ...props }: QueryInputProps) {
  const navigate = routeApi.useNavigate();
  const { q = "" } = routeApi.useSearch();

  const [value, setValue] = useState(q);
  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    navigate({
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
