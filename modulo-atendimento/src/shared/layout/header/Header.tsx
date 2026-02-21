import { ReactNode } from "react";

interface HeaderProps {
    logo: ReactNode | string; 
    children?: ReactNode;     
}

export function Header({ logo, children }: HeaderProps) {
    return (
        <header className="py-4 px-8 w-full border-b flex items-center justify-between bg-surface border-border transition-colors duration-300">
            <div className="text-xl font-bold text-foreground">
                {logo}
            </div>
            
            <div className="flex items-center gap-3">
                {children}
            </div>
        </header>
    );
}