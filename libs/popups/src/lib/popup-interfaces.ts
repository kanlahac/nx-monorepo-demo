/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ReactNode } from "react";

// Define the data structure of each window
export interface PopupInstance { 
    id: string;
    title: string;
    children: ReactNode;
    isInFront?: boolean;
}

// Define the data structure of the popup system
export interface GridState {
    // Data
    instances: PopupInstance[];
    layout: any[];
    gridMode: boolean;
    
    // Actions
    setInFront: (id: string) => void;
    setGridMode: (isGridMode: boolean) => void;
    addPopup: (newPopup: Omit<PopupInstance, "id">) => void;
    closePopup: (id: string) => void;
    maximizePopup: (id: string) => void;
    minimizePopup: (id: string) => void;
    splitPopup: (id: string) => void;
    closeAll: () => void;
    maximizeAll: () => void;
    minimizeAll: () => void;
    splitAll: () => void;
    updateLayout: (currentLayout: any) => void;
}