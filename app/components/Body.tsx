import type { ReactNode } from "react";

interface BodyProps {
  children?: ReactNode;
}

export default function Body({ children }: BodyProps) {
  return (
    <section className="site-body" aria-label="Área principal do site">
      <div className="site-body__background" aria-hidden="true">
        <div className="base-grid" />
        <div className="base-glow base-glow-left" />
        <div className="base-glow base-glow-right" />
        <div className="base-orb base-orb-top" />
        <div className="base-orb base-orb-bottom" />
        <div className="base-noise" />
      </div>
      <div className="site-body__inner">{children}</div>
    </section>
  );
}
