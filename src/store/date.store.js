import { create } from "zustand";
import { persist } from "zustand/middleware";

const useDateStore = create(
  persist(
    (set) => ({
      date: null,
      setDate: (date) => set({ date }),
    }),
    {
      name: "date",
    }
  )
);

export default useDateStore;
