"use client"

import Dock from "@/components/shared/dock";
import { PopupsProvider } from "@libs/popups";


export default function Index() {
    return (
        <main className="h-screen">
            <Dock />
            <PopupsProvider />
        </main>
    );
}
