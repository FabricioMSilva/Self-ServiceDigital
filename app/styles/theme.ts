// Tema centralizado da aplicação
export const theme = {
  colors: {
    primary: "#7A3FFF",
    primaryLight: "#9B6BFF",
    primaryDark: "#5E2FCC",

    logoMagenta: "#7A3FFF",
    logoBlue: "#C0C0C0",

    background: "#2C2C2C",
    surface: "#FFFFFF",
    surfaceLight: "#F5F5F5",
    surfaceDarker: "#C0C0C0",

    text: "#0A0A0A",
    textMuted: "#3A3A3A",
    textSecondary: "#5A5A5A",
    textDimmed: "#7A7A7A",

    accent: "#C0C0C0",
    accentHover: "#A8A8A8",
    success: "#7A3FFF",
    error: "#B3261E",
    warning: "#A06A00",

    border: "#D7D7D7",
    borderLight: "#C0C0C0",
    borderAccent: "#7A3FFF",
  },
  
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "2.5rem", // 40px
    "3xl": "3rem", // 48px
  },
  
  radius: {
    sm: "0.375rem", // 6px
    md: "0.5rem", // 8px
    lg: "0.75rem", // 12px
    xl: "1rem", // 16px
    "2xl": "1.5rem", // 24px
  },
  
  font: {
    family: {
      base: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    size: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
    },
    weight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  
  transitions: {
    fast: "150ms ease-in-out",
    base: "250ms ease-in-out",
    slow: "350ms ease-in-out",
  },
  
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },
  
  breakpoints: {
    xs: "320px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
};

export type Theme = typeof theme;
