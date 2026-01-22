"use client"

import { create } from "zustand";
import type { GridState } from "./popup-interfaces";

export const usePopupStore = create<GridState>((set) => ({
    // Store the popups instances
    instances: [],

    // Store the grid layouts of each popup
    layout: [],

    // Store if grid mode is actived
    gridMode: false,

    // Set the value of isInFront for each popup
    setInFront: (id) => set((state) => ({
        instances: state.instances.map((item) => ({
            ...item,
            isInFront: item.id ===id
        }))
    })),

    // Apply the gridMode
    setGridMode: (isGridMode) => set({ gridMode: isGridMode }),

    // Add a new popup to the instances and layout arrays
    addPopup: (newPopup) => set((state) => {
        const id = crypto.randomUUID();

        return {
            instances: [...state.instances, { ...newPopup, id: id }],
            layout: [...state.layout, { i: id, x: 0, y: 0, w: 3, h: 4, static: false, minW: 3, minH: 4 }]
        }
    }),

    // Remove the popup from instances and layout arrays
    closePopup: (id) => set((state) => ({
        instances: state.instances.filter((item) => item.id !== id),
        layout: state.layout.filter((item) => item.i !== id)
    })),

    // Modify the width of the selected popup to 12
    maximizePopup: (id) => set((state) => ({
        layout: state.layout.map((item) => {
            if (item.i === id) {
                return { ...item, x:0, y: 0, w: 12, h:7, minW: 3, minH: 4 };
            }
            
            return item;
        })
    })),

    // Modify the width of the selected popup to 3
    minimizePopup: (id) => set((state) => ({
        layout: state.layout.map((item) => {
            if (item.i === id) {
                return { ...item, x:0, y: 0, w: 3, h:4, minW: 3, minH: 4 };
            }
            
            return item;
        })
    })),

    // Modify the width of the selected popup to 6
    splitPopup: (id) => set((state) => ({
        layout: state.layout.map((item) => {
            if (item.i === id) {
                return { ...item, x:0, y: 0, w: 6, h:7, minW: 3, minH: 4 };
            }
            
            return item;
        })
    })),
    
    // Clean all popup instances and layout arrays
    closeAll: () => set({ instances: [], layout: [] }),

    // Modify the width of all popups to 12
    maximizeAll: () => set((state) => ({
        layout: state.layout.map((item) => {
            return { ...item, x:0, y: 0, w: 12, h:7, minW: 3, minH: 4 };
        })
    })),

    // Modify the width of all popups to 3
    minimizeAll: () => set((state) => ({
        layout: state.layout.map((item) => {
            return { ...item, x:0, y: 0, w: 3, h:4, minW: 3, minH: 4 };
        })
    })),

    // Modify the width of all popups to 6
    splitAll: () => set((state) => ({
        layout: state.layout.map((item) => {
            return { ...item, x:0, y: 0, w: 6, h:7, minW: 3, minH: 4 };
        })
    })),

    // Update the layout status every change
    updateLayout: (currentLayout) => set({ layout: currentLayout })
}));




