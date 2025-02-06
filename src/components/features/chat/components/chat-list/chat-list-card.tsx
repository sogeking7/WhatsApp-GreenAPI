"use client";

import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { EllipsisVertical, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/stores/chat-store";

export const ChatListCard = ({
  data,
}: {
  data: {
    avatar: string;
    name: string;
    chatId: string;
  };
}) => {
  const {
    removeChat,
    currentChatId,
    setCurrentChatId,
    setCurrentChatCard,
    removeCurrentChatCard,
    removeCurrentChatId,
  } = useChatStore();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setCurrentChatId(data.chatId);
    setCurrentChatCard(data);
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    removeChat(data.chatId);
    removeCurrentChatId();
    removeCurrentChatCard();
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        data.chatId === currentChatId && "bg-gray-300/60",
        data.chatId !== currentChatId && "hover:bg-gray-200/60 ",
        "w-full py-4 px-6  flex justify-between relative",
      )}
    >
      <div className={"flex gap-4"}>
        <Avatar className={"size-12"}>
          <AvatarImage src={data.avatar || "no-image.jpg"} />
        </Avatar>
        <div className={"py-1"}>
          <h3 className={"text-base"}>{data.name}</h3>
          <p className={"text-sm text-gray-500 relative"}></p>
        </div>
      </div>
      <Popover>
        <PopoverTrigger>
          <EllipsisVertical className={"size-4"} />
        </PopoverTrigger>
        <PopoverContent className={"w-auto"}>
          <Button onClick={handleRemove} size={"sm"} variant={"ghost"}>
            <Trash className={"text-destructive"} />
            Remove
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};
