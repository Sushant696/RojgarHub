import { create } from "zustand";

type counterStore = {
  count: number;
  incr: () => void;
};

export const useCounterStore = create<counterStore>((set) => ({
  count: 0,
  incr: () =>
    set((state) => ({
      count: state.count + 1,
    })),
}));
