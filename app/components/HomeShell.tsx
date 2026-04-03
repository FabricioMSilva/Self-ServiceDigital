"use client";

import { useState } from "react";
import useQuoteFormStore from "../stores/quoteFormStore";
import About from "./About";
import Body from "./Body";
import Catalog from "./Catalog";
import Contact from "./Contact";
import Footer from "./Footer";
import Navbar, { type NavbarPage } from "./Navbar";
import PaymentPlan from "./PaymentPlan";
import Portfolio from "./Portfolio";

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
