"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type ChatsStore, createChatsStore } from "@/stores/chats-store";

export type ChatsStoreApi = ReturnType<typeof createChatsStore>;

export const ChatsStoreContext = createContext<ChatsStoreApi | undefined>(
  undefined,
);

export interface ChatsStoreProviderProps {
  children: ReactNode;
}

export const ChatsStoreProvider = ({ children }: ChatsStoreProviderProps) => {
  // @ts-ignore
  const storeRef = useRef<ChatsStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createChatsStore();
  }

  return (
    <ChatsStoreContext.Provider value={storeRef.current}>
      {children}
    </ChatsStoreContext.Provider>
  );
};

export const useChatsStore = <T,>(selector: (store: ChatsStore) => T): T => {
  const chatsStoreContext = useContext(ChatsStoreContext);

  if (!chatsStoreContext) {
    throw new Error(`useChatsStore must be used within ChatsStoreProvider`);
  }

  // @ts-ignore
  return useStore(chatsStoreContext, selector);
};
