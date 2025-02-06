import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist } from "zustand/middleware";

export type ChatCard = {
  avatar: string;
  name: string;
  chatId: string;
};

export type ChatsState = {
  chats: ChatCard[];
  currentChatCard: ChatCard | null;
  currentChatId: string | null;
};

export type ChatsActions = {
  addNewChat: (new_chat: ChatCard) => void;
  removeChat: (chatId: string) => void;
  setCurrentChatId: (chatId: string) => void;
  removeCurrentChatId: () => void;
  setCurrentChatCard: (chat_card: ChatCard) => void;
  removeCurrentChatCard: () => void;
};

export type ChatsStore = ChatsState & ChatsActions;

export const defaultInitState: ChatsState = {
  chats: [],
  currentChatId: null,
  currentChatCard: null,
};

export const createChatsStore = (initState: ChatsState = defaultInitState) => {
  return createStore<ChatsStore>()(
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
        removeCurrentChatCard: () =>
          set((state) => ({ currentChatCard: null })),
      }),
      {
        name: "chats-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ chats: state.chats }),
      },
    ),
  );
};
