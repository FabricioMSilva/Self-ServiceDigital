"use client";

import { ReactNode, useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export function StyledComponentsRegistry({ children }: { children: ReactNode }) {
  // Cria uma folha de estilos isolada por renderização no servidor para coletar
  // o CSS do styled-components antes que o HTML seja enviado ao navegador.
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    // Injeta no <head> tudo o que foi coletado durante o SSR e limpa a tag para
    // os próximos chunks, evitando "flash" de componentes sem estilo.
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") {
    // Depois da hidratação, o styled-components volta a injetar estilos sozinho.
    return <>{children}</>;
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
