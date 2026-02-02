"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          console.log("logout success");
          router.refresh();
        },
      },
    });
  };

  return <Button onClick={handleLogout}>LogOut</Button>;
};
