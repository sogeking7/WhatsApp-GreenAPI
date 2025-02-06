"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/chat-store";

export const ChatTopBar = () => {
  const currentChatCard = useChatStore(state => state.currentChatCard);

  if (!currentChatCard) return null;

  const { avatar, name } = currentChatCard

  return (
    <div className={"w-full h-full bg-white  border-b px-4 flex items-center"}>
      <div className="flex gap-4 items-center">
        <Avatar className={"size-12"}>
          <AvatarImage src={avatar || "no-image.jpg"} />
        </Avatar>
        <h3 className={"text-base font-semibold"}>{name}</h3>
      </div>
    </div>
  );
};
