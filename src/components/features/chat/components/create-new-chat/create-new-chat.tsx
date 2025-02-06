import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { MessageSquarePlus } from "lucide-react";
import { CreateNewChatForm } from "@/components/features/chat/components/create-new-chat/create-new-chat-form";

export const CreateNewChat = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <MessageSquarePlus className="size-5" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Chat</DialogTitle>
        </DialogHeader>
        <CreateNewChatForm />
      </DialogContent>
    </Dialog>
  );
};
