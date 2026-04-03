"use client";

import Image from "next/image";
import { type ReactNode, useState } from "react";
import Link from "next/link";

export type NavbarPage =
  | "home"
  | "sobre"
  | "portfolio"
  | "catalog"
  | "pagamento"
  | "contato";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" width="1em" height="1em" fill="currentColor">
      <path
        d="M13.601 2.326A7.854 7.854 0 0 0 8.165 4.79a7.946 7.946 0 0 0-2.234 5.677 7.88 7.88 0 0 0 1.137 4.174L5.912 18.7l4.204-1.102a7.923 7.923 0 0 0 3.68.904h.003a7.935 7.935 0 0 0 7.934-7.926 7.94 7.94 0 0 0-2.325-5.607A7.872 7.872 0 0 0 13.6 2.326zm.199 14.884h-.003a6.62 6.62 0 0 1-3.372-.92l-.242-.145-2.49.653.666-2.433-.157-.25a6.6 6.6 0 0 1-1.013-3.521 6.68 6.68 0 0 1 1.948-4.74 6.67 6.67 0 0 1 4.758-2.013c3.7 0 6.72 3.014 6.723 6.727a6.68 6.68 0 0 1-6.72 6.642zm3.615-4.917c-.197-.099-1.17-.578-1.352-.643-.182-.066-.315-.099-.447.099-.132.197-.513.643-.63.776-.116.132-.231.149-.428.05-.197-.1-.83-.306-1.58-.977-.584-.521-.978-1.166-1.093-1.364-.116-.197-.012-.304.087-.403.089-.088.197-.23.296-.346.099-.116.132-.198.198-.33.033-.132 0-.248-.05-.347-.05-.099-.446-1.076-.611-1.473-.161-.387-.325-.334-.447-.34a7.905 7.905 0 0 0-.38-.007c-.132 0-.347.05-.528.248-.181.197-.692.677-.692 1.653 0 .975.71 1.918.809 2.05.099.132 1.398 2.136 3.388 2.995.474.205.843.327 1.132.418.475.152.907.13 1.249.079.381-.057 1.17-.479 1.336-.941.165-.462.165-.858.116-.94-.05-.083-.182-.133-.38-.232z"
      />
    </svg>
  );
}

const navItems: Array<{ id: NavbarPage; icon: ReactNode; label: string }> = [
  { id: "home", icon: "🧾", label: "Venda Desenvolvimento" },
  { id: "sobre", icon: "ℹ️", label: "Sobre" },
  { id: "portfolio", icon: "🗂️", label: "Portfólio" },
  { id: "contato", icon: <WhatsAppIcon />, label: "Contato" },
];

interface NavbarProps {
  activePage?: NavbarPage;
  onNavigate?: (page: NavbarPage) => void;
}

export default function Navbar({ activePage = "home", onNavigate }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getDesktopItemClass = (isActive: boolean) =>
    [
      "group relative flex min-h-12 min-w-[74px] flex-col items-center justify-center gap-1 rounded-xl border px-2 py-1 text-[11px] font-medium tracking-wide transition duration-200",
      isActive
        ? "border-white/20 bg-white/14 text-white shadow-[0_6px_20px_rgba(122,63,255,0.22)]"
        : "border-transparent bg-transparent text-white/80 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/10 hover:text-white",
    ].join(" ");

  const getMobileItemClass = (isActive: boolean) =>
    [
      "flex flex-col items-center justify-center gap-1 rounded-xl border px-3 py-3 text-xs font-medium transition",
      isActive
        ? "border-white/15 bg-white/12 text-white"
        : "border-transparent bg-transparent text-white/80 hover:border-white/10 hover:bg-white/10 hover:text-white",
    ].join(" ");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/45 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_35%,rgba(255,255,255,0.1),transparent_25%),radial-gradient(circle_at_88%_35%,rgba(122,63,255,0.28),transparent_30%)]" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-5">
        <Link href="/" aria-label="Ir para a página inicial" className="relative z-10 flex h-[68px] shrink-0 items-center transition hover:opacity-90">
          <Image
            src="/Proposta/LogoMarca/Logo2.png"
            alt="Self-ServiceDigital"
            width={220}
            height={72}
            priority
          />
        </Link>

        <nav aria-label="Menu principal" className="relative z-10 hidden flex-1 items-center justify-end gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href="/"
              className={getDesktopItemClass(activePage === item.id)}
              onClick={(event) => {
                event.preventDefault();
                onNavigate?.(item.id);
                setIsMobileMenuOpen(false);
              }}
            >
              <span aria-hidden="true" className="text-base leading-none">{item.icon}</span>
              <span className="text-center leading-none">{item.label}</span>
            </Link>
          ))}
        </nav>

        <button
          className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-white/20 text-white/90 transition hover:border-white/35 hover:text-white md:hidden"
          type="button"
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          <span className="h-0.5 w-5 bg-current" />
          <span className="h-0.5 w-5 bg-current" />
          <span className="h-0.5 w-5 bg-current" />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`border-t border-white/10 bg-black/55 px-3 pb-3 pt-2 backdrop-blur-xl md:hidden ${isMobileMenuOpen ? "block" : "hidden"
          }`}
      >
        <div className="grid gap-2">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href="/"
              className={getMobileItemClass(activePage === item.id)}
              onClick={(event) => {
                event.preventDefault();
                onNavigate?.(item.id);
                setIsMobileMenuOpen(false);
              }}
            >
              <span aria-hidden="true" className="text-base leading-none">{item.icon}</span>
              <span className="text-center leading-none">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
