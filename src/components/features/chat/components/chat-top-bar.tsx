"use client";

import { useChatsStore } from "@/stores/chats-store-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ChatTopBar = () => {
  const { currentChatCard } = useChatsStore((state) => state);
  return (
    <div className={"w-full h-full bg-white  border-b px-4 flex items-center"}>
      <div className="flex gap-4 items-center">
        <Avatar className={"size-12"}>
          <AvatarImage src={currentChatCard?.avatar || "no-image.jpg"} />
        </Avatar>
        <h3 className={"text-base font-semibold"}>{currentChatCard?.name}</h3>
      </div>
    </div>
  );
};
