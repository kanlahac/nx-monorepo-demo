/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ReactNode } from "react";

export interface PopupInstance {
    id: string;
    title: string;
    children: ReactNode;
    isInFront?: boolean;
}

export interface GridState {
    instances: PopupInstance[];
    layout: any[];
    gridMode: boolean;
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