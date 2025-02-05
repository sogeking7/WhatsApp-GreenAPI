import { Input } from "@/components/ui/input";
import { MessageSquarePlus } from "lucide-react";

export const AppSidebar = () => {
  return (
    <nav className="px-5">
      <div className={"relative"}>
        <h1 className="text-2xl font-semibold mb-5">Chats</h1>
        <Input placeholder={"Search"} className={"w-full"} />
        <button className={"absolute top-1.5 right-2"}>
          <MessageSquarePlus className="size-5" />
        </button>
      </div>
    </nav>
  );
};
