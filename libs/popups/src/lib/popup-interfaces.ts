/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export interface PopupInstance {
    id: string;
    title: string;
    children: ReactNode;
}

export interface GridState {
    instances: PopupInstance[];
    layout: any[];
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