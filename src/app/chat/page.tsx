"use client";

import { ChatTopBar } from "@/components/features/chat/components/chat-top-bar";
import { Chat } from "@/components/features/chat/components/chat";
import { ChatInputForm } from "@/components/features/chat/components/chat-input-form";
import { useHotkeys } from "@/hooks/use-hotkeys";
import { useChatStore } from "@/stores/chat-store";

export default function ChatPage() {
  const { currentChatId, removeCurrentChatId, removeCurrentChatCard } =
    useChatStore();

  useHotkeys("Escape", null, () => {
    removeCurrentChatId();
    removeCurrentChatCard();
  });

  if (!currentChatId) return null;
  return (
    <main className="w-full h-full grid grid-cols-1 grid-rows-[70px_1fr_70px]">
      <ChatTopBar />
      <Chat />
      <ChatInputForm />
    </main>
  );
}
