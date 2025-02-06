"use client";

import { Separator } from "@/components/ui/separator";
import { ChatListCard } from "@/components/features/chat/components/chat-list/chat-list-card";
import { useChatStore } from "@/stores/chat-store";

export const ChatList = () => {
  const { chats } = useChatStore();

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
