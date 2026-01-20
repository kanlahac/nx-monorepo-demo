"use client"

import { create } from "zustand"
import { ThemesState } from "../types/themes-interfaces"

export const useThemeStore = create<ThemesState>((set) => ({

    current: "",

    setTheme: (theme) => set((state) => {
        document.documentElement.setAttribute("data-theme", theme);

        return { current: theme }
    })
    
}));