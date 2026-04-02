import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    background-color: ${theme.colors.background};
  }

  body {
    font-family: ${theme.font.family.base};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    font-size: ${theme.font.size.base};
    font-weight: ${theme.font.weight.normal};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.font.weight.bold};
  }

  h1 {
    font-size: ${theme.font.size["4xl"]};
  }

  h2 {
    font-size: ${theme.font.size["3xl"]};
  }

  h3 {
    font-size: ${theme.font.size["2xl"]};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }

  /* Scrollbar customizado */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.surfaceLight};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: ${theme.radius.md};

    &:hover {
      background: ${theme.colors.primaryLight};
    }
  }

  /* Animações */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default GlobalStyle;
