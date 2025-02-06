"use client";

import { useChatsStore } from "@/stores/chats-store-provider";
import { Separator } from "@/components/ui/separator";
import { ChatListCard } from "@/components/features/chat/components/chat-list-card";

export const ChatsList = () => {
  const { chats } = useChatsStore((state) => state);
  return (
    <ul>
      {chats.map((chat) => (
        <div key={chat.chatId}>
          <ChatListCard data={chat} />
          <Separator />
        </div>
      ))}
    </ul>
  );
};
