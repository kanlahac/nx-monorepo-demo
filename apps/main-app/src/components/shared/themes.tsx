"use client"

import { memo } from "react";
import { useThemeStore } from "../definitions/stores/themes-store";

function Themes() {
    const THEMES = [
        "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", 
        "synthwave", "retro", "cyberpunk", "valentine", "halloween", 
        "garden", "forest", "aqua", "lofi", "pastel", "fantasy", 
        "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", 
        "business", "acid", "lemonade", "night", "coffee", "winter", 
        "dim", "nord", "sunset"
    ];

    const { setTheme, current }= useThemeStore();

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-wrap gap-2 p-2 justify-between">
                {
                    THEMES.map((item, index) => (
                        <input
                            key={index}
                            type="radio"
                            name="theme-buttons"
                            className="btn btn-soft theme-controller join-item justify-start capitalize"
                            aria-label={item}
                            checked={current === item}
                            onChange={() => setTheme(item)}
                            value={item} 
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default memo(Themes);
