import { create } from "zustand";
import type { GridState } from "./popup-interfaces";

export const usePopupStore = create<GridState>((set) => ({
    instances: [],
    layout: [],

    addPopup: (newPopup) => set((state) => {
        const id = crypto.randomUUID();

        return {
            instances: [...state.instances, { ...newPopup, id: id }],
            layout: [...state.layout, { i: id, x: 0, y: 0, w: 3, h: 3, static: false }]
        }
    }),

    closePopup: (id) => set((state) => ({
        instances: state.instances.filter((item) => item.id !== id),
        layout: state.layout.filter((item) => item.i !== id)
    })),

    maximizePopup: (id) => set((state) => ({
        layout: state.layout.map((item) => {
            if (item.i === id) {
                return { ...item, x:0, y: 0, w: 12, h:7 };
            }
            
            return item;
        })
    })),

    minimizePopup: (id) => set((state) => ({
        layout: state.layout.map((item) => {
            if (item.i === id) {
                return { ...item, x:0, y: 0, w: 3, h:3 };
            }
            
            return item;
        })
    })),

    splitPopup: (id) => set((state) => ({
        layout: state.layout.map((item) => {
            if (item.i === id) {
                return { ...item, x:0, y: 0, w: 6, h:7 };
            }
            
            return item;
        })
    })),

    closeAll: () => set({ instances: [], layout: [] }),

    maximizeAll: () => set((state) => ({
        layout: state.layout.map((item) => {
            return { ...item, x:0, y: 0, w: 12, h:7 };
        })
    })),

    minimizeAll: () => set((state) => ({
        layout: state.layout.map((item) => {
            return { ...item, x:0, y: 0, w: 3, h:3 };
        })
    })),

    splitAll: () => set((state) => ({
        layout: state.layout.map((item) => {
            return { ...item, x:0, y: 0, w: 6, h:7 };
        })
    })),

    updateLayout: (currentLayout) => set({ layout: currentLayout })
}));




