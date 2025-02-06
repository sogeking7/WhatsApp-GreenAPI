import { TGetContactInfo } from "@/types/green-api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ChatState = {
  chats: TGetContactInfo[];
  currentChatCard: TGetContactInfo | null;
  currentChatId: string | null;
};

type ChatActions = {
  addNewChat: (new_chat: TGetContactInfo
  ) => void;
  removeChat: (chatId: string) => void;
  setCurrentChatId: (chatId: string) => void;
  removeCurrentChatId: () => void;
  setCurrentChatCard: (chat_card: TGetContactInfo) => void;
  removeCurrentChatCard: () => void;
};

type ChatStore = ChatState & ChatActions;

const defaultInitState: ChatState = {
  chats: [],
  currentChatId: null,
  currentChatCard: null,
};

const initState: ChatState = defaultInitState;

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      ...initState,
      addNewChat: (new_chat) =>
        set((state) => {
          const isExist = state.chats.some(
            (chat) => chat.chatId === new_chat.chatId,
          );
          if (isExist) return state;
          return { chats: [...state.chats, new_chat] };
        }),
      removeChat: (chatId: string) =>
        set((state) => {
          const filteredChats = state.chats.filter(
            (chat) => chat.chatId !== chatId,
          );
          return { chats: filteredChats };
        }),
      setCurrentChatId: (chatId: string) =>
        set((state) => ({
          currentChatId: chatId,
        })),
      removeCurrentChatId: () => set((state) => ({ currentChatId: null })),
      setCurrentChatCard: (chat_card) =>
        set((state) => ({
          currentChatCard: chat_card,
        })),
      removeCurrentChatCard: () => set((state) => ({ currentChatCard: null })),
    }),
    {
      name: "chats-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ chats: state.chats }),
    },
  ),
);
