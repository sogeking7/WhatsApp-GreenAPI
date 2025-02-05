import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut } from "@/app/actions/auth";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center w-full ">
      <div className="space-y-3 flex flex-col items-center text-center">
        <h1 className="uppercase text-3xl font-bold text-green-500">
          Green-api
        </h1>
        <Link href="/chat">
          <Button>Chat</Button>
        </Link>

        <Button
          variant={"destructive"}
          onClick={async () => {
            "use server";
            await signOut();
            redirect("/auth/sign-in");
          }}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
