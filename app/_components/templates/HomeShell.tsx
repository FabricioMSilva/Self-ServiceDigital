"use client";

import { useState } from "react";
import Body from "@/app/_components/atoms/Body";
import About from "@/app/_components/organisms/About";
import Catalog from "@/app/_components/organisms/Catalog";
import Contact from "@/app/_components/organisms/Contact";
import Footer from "@/app/_components/organisms/Footer";
import Navbar, { type NavbarPage } from "@/app/_components/organisms/Navbar";
import PaymentPlan from "@/app/_components/organisms/PaymentPlan";
import Portfolio from "@/app/_components/organisms/Portfolio";
import useQuoteFormStore from "@/app/_features/quote/stores/quoteFormStore";

function renderPage(page: NavbarPage, catalogKey: number) {
  // Mantém a landing como uma navegação interna por estado, evitando trocar de
  // rota a cada seção visual e facilitando a experiência de orçamento.
  switch (page) {
    case "sobre":
      return <About />;
    case "portfolio":
      return <Portfolio />;
    case "catalog":
      return <Catalog key={`catalog-${catalogKey}`} />;
    case "pagamento":
      return <PaymentPlan />;
    case "contato":
      return <Contact />;
    case "home":
    default:
      return <Catalog key={`catalog-${catalogKey}`} />;
  }
}

export default function HomeShell() {
  const [activePage, setActivePage] = useState<NavbarPage>("home");
  const [catalogKey, setCatalogKey] = useState(0);
  const clearDraft = useQuoteFormStore((state) => state.clearDraft);

  const handleNavigate = (page: NavbarPage) => {
    // Ao voltar ao início, reiniciamos o catálogo para descartar respostas
    // antigas e reabrir a jornada comercial pela primeira pergunta.
    if (page === "home") {
      clearDraft();
      setCatalogKey((current) => current + 1);
    }

    setActivePage(page);
  };

  return (
    <main className="base-shell" aria-label="Base visual do projeto">
      <Navbar activePage={activePage} onNavigate={handleNavigate} />
      <Body>{renderPage(activePage, catalogKey)}</Body>
      <Footer />
    </main>
  );
}
