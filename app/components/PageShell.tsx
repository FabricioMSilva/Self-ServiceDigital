import type { ReactNode } from "react";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

interface PageShellProps {
  children: ReactNode;
}

// Wrapper visual compartilhado entre as rotas internas para evitar repetir
// a mesma estrutura de header e footer em várias páginas do App Router.
export default function PageShell({ children }: PageShellProps) {
  return (
    <div className="bg-[#040b1f] text-white min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
