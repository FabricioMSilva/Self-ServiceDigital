import type { ReactNode } from "react";
import Footer from "@/app/_components/organisms/Footer";
import Navbar from "@/app/_components/organisms/Navbar";

interface PageShellProps {
  children: ReactNode;
}

// Wrapper visual compartilhado entre as rotas internas para evitar repetir
// a mesma estrutura de header e footer em várias páginas do App Router.
export default function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.2),transparent_28%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.14),transparent_30%),#06070d] text-white">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
