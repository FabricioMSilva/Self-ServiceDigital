"use client";

import Image from "next/image";
import { type ReactNode, useState } from "react";
import {
  HeaderContainer,
  LogoLink,
  MobileMenuButton,
  MobileMenuContainer,
  MobileMenuContent,
  MobileNavLink,
  NavLink,
  NavMenu,
  NavWrapper,
} from "../styles/components/navbar.styles";

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

  return (
    <HeaderContainer>
      <NavWrapper>
        <LogoLink href="/" aria-label="Ir para a página inicial">
          <Image
            src="/Proposta/LogoMarca/Logo2.png"
            alt="Self-ServiceDigital"
            width={220}
            height={72}
            priority
          />
        </LogoLink>

        <NavMenu aria-label="Menu principal">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              href="/"
              $isActive={activePage === item.id}
              onClick={(event) => {
                event.preventDefault();
                // Na home navegamos por estado interno; nas demais páginas o
                // href continua servindo como fallback seguro para "/".
                onNavigate?.(item.id);
                setIsMobileMenuOpen(false);
              }}
            >
              <span aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </NavMenu>

        <MobileMenuButton
          type="button"
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </MobileMenuButton>
      </NavWrapper>

      <MobileMenuContainer $isOpen={isMobileMenuOpen} id="mobile-menu">
        <MobileMenuContent>
          {navItems.map((item) => (
            <MobileNavLink
              key={item.id}
              href="/"
              $isActive={activePage === item.id}
              onClick={(event) => {
                event.preventDefault();
                onNavigate?.(item.id);
                setIsMobileMenuOpen(false);
              }}
            >
              <span aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </MobileNavLink>
          ))}
        </MobileMenuContent>
      </MobileMenuContainer>
    </HeaderContainer>
  );
}
