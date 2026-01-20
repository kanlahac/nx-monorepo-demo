"use client"

import { create } from "zustand";
import { PersonListState } from "../types/person-interfaces";

export const usePersonStore = create<PersonListState>((set) => ({

    list: [],

    addPerson: (newPerson) => set((state) => ({
        list: [...state.list, {...newPerson, id: crypto.randomUUID()}]
    })),

    removePerson: (id) => set((state) => ({
        list: state.list.filter((item) => item.id !== id)
    })),

    removeAll: () => set({ list: [] })
    
}));