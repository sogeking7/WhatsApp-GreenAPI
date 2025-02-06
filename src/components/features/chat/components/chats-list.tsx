import { ChatCard } from "@/components/features/chat/components/chat-card";
import { Separator } from "@/components/ui/separator";

export const ChatsList = () => {
  return (
    <ul>
      <ChatCard />
      <Separator />
      <ChatCard />
    </ul>
  );
};
