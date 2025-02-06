import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center w-full ">
      <div className="space-y-6 flex flex-col items-center text-center">
        <h1 className="uppercase text-3xl font-bold text-green-500">
          Green-api
        </h1>
        <Link href="/chat">
          <Button size={"lg"} className={"rounded-full"}>
            Start chat
          </Button>
        </Link>
      </div>
    </div>
  );
}
