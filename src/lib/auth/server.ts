import { convexBetterAuthReactStart } from "@convex-dev/better-auth/react-start";

export const {
  handler,
  // getToken,
  fetchAuthQuery,
  fetchAuthMutation,
  fetchAuthAction,
} = convexBetterAuthReactStart({
  convexUrl: process.env.VITE_CONVEX_URL!,
  convexSiteUrl: process.env.VITE_CONVEX_SITE_URL!,
});

// NOTE: THIS IS JUST TEMPORARY UNTIL THE PROBLEM SOVLED BY CONVEXT BETTER AUTH PACKAGE
export const getToken = async () => {
  const { getRequestHeaders } = await import("@tanstack/react-start/server");
  const headers = new Headers(getRequestHeaders());
  headers.delete("content-length");
  headers.delete("transfer-encoding");
  headers.set("accept-encoding", "identity");
  headers.set("host", new URL(process.env.VITE_CONVEX_SITE_URL!).host);

  const res = await fetch(
    `${process.env.VITE_CONVEX_SITE_URL}/api/auth/convex/token`,
    { headers },
  );
  if (!res.ok) return null;
  const data = (await res.json()) as { token?: string };
  return data?.token ?? null;
};
