// store for control the sidebar collapsed state using zustand

import { SIDEBAR_STORAGE_KEY } from "@/constants/local-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// with persistent data
interface SidebarState {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      collapsed: false,
      setCollapsed: (collapsed) => set({ collapsed }),
    }),
    {
      name: SIDEBAR_STORAGE_KEY,
    }
  )
);
