"use client"

import { create } from "zustand"
import { ThemesState } from "../types/themes-interfaces"

export const useThemeStore = create<ThemesState>((set) => ({

    // Store the current theme
    current: "",

    // Set a new current theme
    setTheme: (theme) => set((state) => {
        document.documentElement.setAttribute("data-theme", theme);

        return { current: theme }
    })
    
}));