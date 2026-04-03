"use client";

import Image from "next/image";

const pillars = [
  {
    title: "História",
    description:
      "A Self-ServiceDigital nasceu da prática real em projetos digitais sob medida, evoluindo de demandas independentes para operações mais estruturadas com foco em resultado, clareza e confiança.",
  },
  {
    title: "O que fazemos",
    description:
      "Criamos sites, aplicativos, sistemas, automações comerciais, robôs para atendimento e soluções em Power Platform, sempre conectando tecnologia, design e estratégia de negócio.",
  },
  {
    title: "Compromisso",
    description:
      "Nosso compromisso é desenvolver soluções úteis para empresas e para a sociedade, com responsabilidade, acessibilidade, transparência, qualidade técnica e parceria de longo prazo.",
  },
];

export default function About() {
  return (
    <section id="sobre" className="about-panel" aria-labelledby="about-title">
      <div className="about-panel__logo">
        <Image
          src="/Proposta/LogoMarca/Logo2.png"
          alt="Self-ServiceDigital"
          width={260}
          height={86}
          priority
        />
      </div>

      <div className="about-panel__header">
        <span className="about-panel__eyebrow">Sobre a Empresa</span>
        <h2 id="about-title" className="about-panel__title">
          Tecnologia com propósito, execução e parceria
        </h2>
        <p className="about-panel__description">
          A Self-ServiceDigital atua no desenvolvimento de soluções digitais para empresas que
          precisam crescer com estrutura, presença e eficiência. Trabalhamos com projetos web,
          aplicativos, sistemas, automações e produtos sob medida, sempre buscando unir visão de
          negócio, design funcional e implementação técnica consistente.
        </p>
        <p className="about-panel__description">
          Acreditamos em relações transparentes, planejamento responsável e entregas que gerem
          valor real. Nosso objetivo é ajudar negócios a evoluírem com tecnologia acessível,
          escalável e alinhada com impacto positivo para clientes, equipes e sociedade.
        </p>
      </div>

      <div className="about-panel__grid">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="about-panel__card">
            <h3 className="about-panel__card-title">{pillar.title}</h3>
            <p className="about-panel__card-description">{pillar.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
