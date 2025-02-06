"use client";

import { useChatsStore } from "@/stores/chats-store-provider";
import { Separator } from "@/components/ui/separator";
import { ChatListCard } from "@/components/features/chat/components/chat-list/chat-list-card";

export const ChatList = () => {
  const { chats } = useChatsStore((state) => state);
  return (
    <ul>
      {chats.map((chat) => (
        <li key={chat.chatId}>
          <ChatListCard data={chat} />
          <Separator />
        </li>
      ))}
    </ul>
  );
};
