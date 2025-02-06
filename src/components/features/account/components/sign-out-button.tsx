import { signOut } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";

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
      <LogOut className={"text-destructive"} />
      Log out
    </button>
  );
};
