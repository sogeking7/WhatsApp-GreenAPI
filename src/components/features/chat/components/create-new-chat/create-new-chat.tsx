"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { MessageSquarePlus } from "lucide-react";
import { CreateNewChatForm } from "@/components/features/chat/components/create-new-chat/create-new-chat-form";
import { useState } from "react";

export const CreateNewChat = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog defaultOpen={open} open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>
        <MessageSquarePlus className="size-5" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Chat</DialogTitle>
        </DialogHeader>
        <CreateNewChatForm setDialogOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
