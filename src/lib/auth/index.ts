import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";

export const auth = betterAuth({
  plugins: [tanstackStartCookies()], // make sure tanstackstart is the last plugin in the array
  //...
});
