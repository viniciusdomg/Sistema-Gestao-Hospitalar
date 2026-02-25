'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

function SidebarItem({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
}) {
    const pathname = usePathname();
    const isRootRoute = href === "/";
    const isActive = isRootRoute
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

    return (
    <li className="mb-2">
      <Link 
        href={href} 
        onClick={onNavigate}
        className={`block p-3 rounded-lg transition-colors sidebar-link ${isActive ? "active" : ""}`}
      >
        {label}
      </Link>
    </li>
  );
}

export default SidebarItem;
