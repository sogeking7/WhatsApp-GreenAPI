import { Input } from "@/components/ui/input";
import { CreateNewChat } from "@/components/features/chat/components/create-new-chat/create-new-chat";
import { ChatList } from "@/components/features/chat/components/chat-list/chat-list";

export const AppSidebar = () => {
  return (
    <nav className=" space-y-2">
      <div className={"relative mx-5"}>
        <h1 className="text-2xl font-semibold mb-5 tracking-tight">Chats</h1>
        <Input placeholder={"Search"} className={"w-full"} />
        <div className={"absolute top-1.5 right-1"}>
          <CreateNewChat />
        </div>
      </div>
      <div>
        <ChatList />
      </div>
    </nav>
  );
};
