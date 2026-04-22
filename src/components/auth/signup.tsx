import { authClient } from "@/lib/auth/client";

import { Button } from "@/components/ui/button";

export function SignUp() {
  const handleSignUp = async () => {
    const { data, error } = await authClient.signUp.email({
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    });

    if (error) {
      console.error("Signup failed:", error);
      alert("Signup failed: check conosole");
    } else {
      console.log("Signup successful:", data);
      alert("Signup successful!");
    }
  };

  return <Button onClick={handleSignUp}>Hardcoded SignUp</Button>;
}
