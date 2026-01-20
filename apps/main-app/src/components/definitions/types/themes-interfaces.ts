"use client"

export interface ThemesState{
    current: string;
    setTheme: (theme: string) => void;
}