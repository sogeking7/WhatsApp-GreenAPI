"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { EllipsisVertical, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useChatsStore } from "@/stores/chats-store-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ChatListCard = ({
  data,
}: {
  data: {
    avatar: string;
    name: string;
    chatId: string;
  };
}) => {
  const { removeChat, currentChatId, setCurrentChatId, setCurrentChatCard } =
    useChatsStore((state) => state);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setCurrentChatId(data.chatId);
        setCurrentChatCard(data);
      }}
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
          <Button
            onClick={() => removeChat(data.chatId)}
            size={"sm"}
            variant={"ghost"}
          >
            <Trash className={"text-destructive"} />
            Remove
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};
