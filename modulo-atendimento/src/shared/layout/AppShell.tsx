"use client";

import { ReactNode, useEffect, useState } from "react";
import { ThemeToggle } from "@/src/features/tema/components/ThemeToggle";
import { Header } from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

interface AppShellProps {
  children: ReactNode;
}

const MENU_ITEMS = [
  { label: "Dashboard", href: "/" },
  { label: "Pacientes", href: "/pacientes" },
  { label: "Registro de Atendimento", href: "/atendimentos" },
];

export function AppShell({ children }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const sidebarFooter = (
    <div className="rounded-lg bg-background px-3 py-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-muted">Tema</span>
        <ThemeToggle size="sm" />
      </div>
    </div>
  );

  return (
    <>
      <Header
        logo="LIGA contra o câncer"
        onMenuToggle={toggleSidebar}
        isMenuOpen={isSidebarOpen}
      />

      <article className="relative flex flex-1 overflow-hidden">
        <Sidebar
          title="LIGA contra o câncer"
          menuItems={MENU_ITEMS}
          footer={sidebarFooter}
          className="hidden shrink-0 md:flex"
        />

        <div
          aria-hidden="true"
          onClick={closeSidebar}
          className={`absolute inset-0 z-30 bg-black/40 transition-opacity md:hidden ${
            isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        <Sidebar
          title="LIGA contra o câncer"
          menuItems={MENU_ITEMS}
          footer={sidebarFooter}
          onNavigate={closeSidebar}
          className={`absolute inset-y-0 left-0 z-40 w-72 transform transition-transform duration-200 ease-out md:hidden ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </article>
    </>
  );
}
