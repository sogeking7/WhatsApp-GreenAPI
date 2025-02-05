import { Button } from "@/components/ui/button";
import { signOut } from "@/app/actions/auth";
import { redirect } from "next/navigation";

export const SignOutButton = () => {
  return (
    <button
      className={"w-full"}
      onClick={async () => {
        "use server";
        await signOut();
        redirect("/auth/sign-in");
      }}
    >
      Log out
    </button>
  );
};
