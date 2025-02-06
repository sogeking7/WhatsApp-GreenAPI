import { createStore } from "zustand/vanilla";

export type ChatsState = {
  count: number;
};

export type ChatsActions = {
  decrementCount: () => void;
  incrementCount: () => void;
};

export type ChatsStore = ChatsState & ChatsActions;

export const defaultInitState: ChatsState = {
  count: 0,
};

export const createChatsStore = (initState: ChatsState = defaultInitState) => {
  return createStore<ChatsState>()((set) => ({
    ...initState,
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
    incrementCount: () => set((state) => ({ count: state.count + 1 })),
  }));
};
