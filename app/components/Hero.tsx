import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="grid gap-8 md:grid-cols-2 md:items-center">
      <div>
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-300">Desenvolvimento Web, Apps e Sistemas</p>
        <h2 className="mb-5 text-4xl font-black leading-tight text-white md:text-6xl">Seu Projeto, Sua Escolha, Nosso Código.</h2>
        <p className="mb-6 max-w-xl text-slate-300">
          Transformamos ideias em produtos digitais profissionais: web, Android e sistemas sob medida.
          Pagamento por etapa e entrega incremental para garantir confiança.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="#catalog" className="rounded-lg bg-cyan-500 px-5 py-3 text-sm font-bold text-black hover:bg-cyan-400">Montar Orçamento</a>
          <a href="#portfolio" className="rounded-lg border border-cyan-400 px-5 py-3 text-sm text-cyan-200 hover:bg-cyan-800/50">Ver Portfólio</a>
        </div>
      </div>
      <div className="relative h-80 w-full overflow-hidden rounded-xl border border-cyan-500/30 bg-slate-900 md:h-96">
        <Image src="/proposta/PaginaHome.png" alt="Hero design" fill className="object-cover opacity-90" />
      </div>
    </section>
  );
}
