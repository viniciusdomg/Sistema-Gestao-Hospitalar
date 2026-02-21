'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

function SidebarItem({href, label}: {href: string, label: string}) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
    <li className="mb-2">
      <Link 
        href={href} 
        className={`block p-3 rounded-lg transition-colors sidebar-link ${isActive ? "active" : ""}`}
      >
        {label}
      </Link>
    </li>
  );
}

export default SidebarItem;