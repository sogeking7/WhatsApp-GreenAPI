import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist } from "zustand/middleware";

export type ChatCard = {
  avatar: string;
  name: string;
  chatId: string;
};

export type ChatsState = {
  chats: ChatCard[];
};

export type ChatsActions = {
  addNewChat: (new_chat: ChatCard) => void;
  removeChat: (chatId: string) => void;
};

export type ChatsStore = ChatsState & ChatsActions;

export const defaultInitState: ChatsState = {
  chats: [],
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
      }),
      {
        name: "chats-storage",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};
