"use client"

import { useShallow } from "zustand/react/shallow";
import { usePopupStore } from "./popup-store";

// This is an abstraction hook for the popup store, is not necesary but is a good idea
export const usePopup = () => {

    // Update the data but use the zustand hook useShallow for avoid Re-renders
    const { instances, layout } = usePopupStore(
        useShallow((state) => ({
            instances: state.instances,
            layout: state.layout,
        }))
    );

    // Abstraction for every popup store method
    const gridMode = usePopupStore((state) => state.gridMode);
    const setInFront = usePopupStore((state) => state.setInFront);
    const setGridMode = usePopupStore((state) => state.setGridMode);
    const addPopup = usePopupStore((state) => state.addPopup);
    const closePopup = usePopupStore((state) => state.closePopup);
    const maximizePopup = usePopupStore((state) => state.maximizePopup);
    const minimizePopup = usePopupStore((state) => state.minimizePopup);
    const splitPopup = usePopupStore((state) => state.splitPopup);
    const closeAll = usePopupStore((state) => state.closeAll);
    const maximizeAll = usePopupStore((state) => state.maximizeAll);
    const minimizeAll = usePopupStore((state) => state.minimizeAll);
    const splitAll = usePopupStore((state) => state.splitAll);
    const updateLayout = usePopupStore((state) => state.updateLayout);

    return {
        instances, 
        layout, 
        gridMode,
        setInFront,
        setGridMode,
        addPopup, 
        closePopup,
        maximizePopup,
        minimizePopup,
        splitPopup, 
        closeAll,
        maximizeAll,
        minimizeAll,
        splitAll,
        updateLayout 
    };
};
