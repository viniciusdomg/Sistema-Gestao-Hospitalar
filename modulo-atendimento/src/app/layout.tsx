import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

import Sidebar from "../shared/layout/sidebar/Sidebar";
import { Header } from "../shared/layout/header/Header";
import { ThemeToggle } from "../features/tema/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema de Gestão Hospitalar",
  description: "Módulo de Atendimento - LIGA",
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen overflow-hidden`}
      >
        <Header logo="LIGA contra o câncer"> 
          <ThemeToggle />
        </Header>
        
        <div className="flex flex-1 overflow-hidden">
          <Sidebar 
          title="LIGA contra o câncer"
          menuItems={[
            { label: "Dashboard", href: "/" },
            { label: "Pacientes", href: "/pacientes" },
            { label: "Atendimentos", href: "/atendimentos" },
          ]}
          />  
          
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            
            {children}

          </main>
          
        </div>
      </body>
    </html>
  );
}
