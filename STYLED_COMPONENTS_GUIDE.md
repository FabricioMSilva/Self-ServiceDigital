# 📚 Guia Styled-Components - Arquitetura

## 🎯 Visão Geral

Migramos de Tailwind CSS para **styled-components** com uma arquitetura profissional e organizada.

## 📁 Estrutura de Pastas

```
app/
├── styles/
│   ├── index.ts                    # Centralizador de importações
│   ├── theme.ts                    # Tema e constantes
│   ├── global.ts                   # Estilos globais
│   └── components/
│       ├── navbar.styles.ts        # Estilos do Navbar
│       ├── cartbadge.styles.ts     # Estilos do CartBadge
│       ├── form.styles.ts          # Estilos de formulários
│       └── buttons.styles.ts       # Estilos de botões
└── components/
    ├── Navbar.tsx                  # Componentes usando styled
    ├── CartBadge.tsx
    └── ...
```

## 🎨 Theme (Tema Centralizado)

O arquivo `theme.ts` contém todas as constantes de design:

```typescript
export const theme = {
  colors: { /* cores */ },
  spacing: { /* espaçamentos */ },
  radius: { /* border-radius */ },
  font: { /* tipografia */ },
  transitions: { /* animações */ },
  shadows: { /* sombras */ },
  breakpoints: { /* media queries */ },
};
```

## 💅 Como Usar

### Importar Estilos

```typescript
import * as S from "@/app/styles/components/navbar.styles";

export function Navbar() {
  return (
    <S.HeaderContainer>
      <S.NavWrapper>
        <S.LogoLink href="/">Logo</S.LogoLink>
        {/* ... */}
      </S.NavWrapper>
    </S.HeaderContainer>
  );
}
```

### Criar Novos Estilos

1. **Crie um arquivo** em `app/styles/components/seu-componente.styles.ts`

2. **Importe o theme**:
```typescript
import styled from "styled-components";
import { theme } from "../theme";
```

3. **Crie componentes estilizados**:
```typescript
export const Container = styled.div`
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.surface};
  border-radius: ${theme.radius.lg};
`;

export const Title = styled.h1`
  font-size: ${theme.font.size["2xl"]};
  color: ${theme.colors.primaryLight};
`;
```

4. **Exporte em `app/styles/index.ts`**:
```typescript
export * as SeuComponenteStyles from "./components/seu-componente.styles";
```

5. **Use no componente**:
```typescript
import * as S from "@/app/styles/components/seu-componente.styles";

export function SeuComponente() {
  return (
    <S.Container>
      <S.Title>Título</S.Title>
    </S.Container>
  );
}
```

## 🎯 Boas Práticas

### ✅ DO's

- Use o theme para cores, espaçamento, etc.
- Organize componentes por tipo (buttons, forms, etc.)
- Use naming: `ContainerName`, `TitleName`, etc.
- Reutilize estilos base com `styled(BaseComponent)`
- Adicione media queries quando necessário

### ❌ DON'Ts

- Não hardcode cores ou valores
- Não crie styles inline em componentes
- Não misture Tailwind com styled-components
- Não ignore o theme para valores custom

## 🎨 Exemplo Completo

**Arquivo: `app/styles/components/card.styles.ts`**
```typescript
import styled from "styled-components";
import { theme } from "../theme";

export const CardContainer = styled.div`
  padding: ${theme.spacing.lg};
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  transition: all ${theme.transitions.base};

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.md};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
  }
`;

export const CardTitle = styled.h2`
  font-size: ${theme.font.size.xl};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
  font-weight: ${theme.font.weight.bold};
`;

export const CardDescription = styled.p`
  font-size: ${theme.font.size.sm};
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
`;
```

**Usar em componente:**
```typescript
import * as S from "@/app/styles/components/card.styles";

export function Card({ title, description }) {
  return (
    <S.CardContainer>
      <S.CardTitle>{title}</S.CardTitle>
      <S.CardDescription>{description}</S.CardDescription>
    </S.CardContainer>
  );
}
```

## 🔧 Temas Dinâmicos (Futuro)

Para implementar dark/light mode:

```typescript
// app/styles/themes.ts
export const lightTheme = { /* ... */ };
export const darkTheme = { /* ... */ };

// app/layout.tsx
import { ThemeProvider } from "styled-components";

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("dark");
  
  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  );
}
```

## 📊 Vantagens

✅ **Type-safe**: IntelliSense completo  
✅ **Zero CSS duplication**: Tudo é importado do theme  
✅ **Easy maintenance**: Mudanças globais em um arquivo  
✅ **Dynamic styling**: Baseado em props  
✅ **Performance**: CSS otimizado automaticamente  
✅ **Developer experience**: Sem conflitos de classe  

## 🚀 Próximos Passos

1. Migrar componentes restantes para styled-components
2. Criar theme provider para dark mode
3. Adicionar transições e animações reutilizáveis
4. Criar biblioteca de componentes estilizados

---

**Data**: Abril 2026 | **Status**: ✅ Implementado com sucesso
