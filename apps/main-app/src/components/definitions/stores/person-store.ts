"use client"

import { create } from "zustand";
import { PersonListState } from "../types/person-interfaces";

export const usePersonStore = create<PersonListState>((set) => ({

    // Store the persons data
    list: [],

    // Add a new person to the list
    addPerson: (newPerson) => set((state) => ({
        list: [...state.list, {...newPerson, id: crypto.randomUUID()}]
    })),

    // Remove a person from the list
    removePerson: (id) => set((state) => ({
        list: state.list.filter((item) => item.id !== id)
    })),

    // Clean the list
    removeAll: () => set({ list: [] })
    
}));