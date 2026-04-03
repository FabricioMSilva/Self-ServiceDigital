export default function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-black/45 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_70%,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_85%_35%,rgba(122,63,255,0.2),transparent_28%)]" />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start justify-between gap-1 px-4 py-2 text-xs text-white/80 sm:flex-row sm:items-center sm:gap-4 sm:px-5">
        <p className="m-0 leading-snug">
          © {new Date().getFullYear()} Self-ServiceDigital. Todos os direitos reservados.
        </p>
        <p className="m-0 leading-snug">Orcamento digital sob medida para web, mobile e automacoes.</p>
      </div>
    </footer>
  );
}
