import { ReactNode } from "react";
import SidebarItem from "./SidebarItem";

interface MenuItem {
  label: string;
  href: string;
}

interface SidebarProps {
  title?: string;
  menuItems?: MenuItem[];
  className?: string;
  onNavigate?: () => void;
  footer?: ReactNode;
}

function Sidebar({
  title = "Sistema",
  menuItems = [],
  className = "",
  onNavigate,
  footer,
}: SidebarProps) {
  return (
    <aside
      className={`sidebar-container flex h-full w-64 flex-col bg-surface p-6 shadow-xl ${className}`}
    >
      <div className="mb-8 hidden">
        <h2 className="text-xl uppercase tracking-wider sidebar-title">
          {title}
        </h2>
      </div>

      <nav className="flex-1">
        <ul>
          {menuItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      </nav>

      {footer ? <div className="mt-4 border-t border-border pt-4">{footer}</div> : null}
    </aside>
  );
}

export default Sidebar;
