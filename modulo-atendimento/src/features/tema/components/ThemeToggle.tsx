"use client";
import { useState } from "react";

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(
        typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "dark"
    );

    const toggle = () => {
        const html = document.documentElement;
        if (html.getAttribute("data-theme") === "dark") {
            html.removeAttribute("data-theme");
            setIsDark(false);
        } else {
            html.setAttribute("data-theme", "dark");
            setIsDark(true);
        }
    };

    return (
        <button 
            onClick={toggle}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-background hover:opacity-80 transition-opacity text-foreground"
        >
            {isDark ? "icon-light" : "icon-dark"}
        </button>
    );
}