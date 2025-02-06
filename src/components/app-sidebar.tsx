import { Input } from "@/components/ui/input";
import { CreateNewChat } from "@/components/features/chat/components/create-new-chat/create-new-chat";
import { ChatsList } from "@/components/features/chat/components/chats-list";

export const AppSidebar = () => {
  return (
    <nav className=" space-y-2">
      <div className={"relative mx-5"}>
        <h1 className="text-2xl font-semibold mb-5">Chats</h1>
        <Input placeholder={"Search"} className={"w-full"} />
        <div className={"absolute top-1.5 right-2"}>
          <CreateNewChat />
        </div>
      </div>
      <div>
        <ChatsList />
      </div>
    </nav>
  );
};
