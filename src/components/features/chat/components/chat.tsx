"use client";

import { useChatsStore } from "@/stores/chats-store-provider";

export const Chat = () => {
  const { currentChatId } = useChatsStore((state) => state);
  return <div className={"w-full h-full bg-white"}></div>;
};
