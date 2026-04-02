export type ProductType = "web" | "android" | "sistema";

export const catalogItems = [
  { id: "header", label: "Header / Menu responsivo", price: 300 },
  { id: "pages", label: "Páginas (body)", price: 250 },
  { id: "footer", label: "Footer completo", price: 200 },
];

export const extraItems = [
  { id: "login", label: "Login / Autenticação", price: 350 },
  { id: "dashboard", label: "Dashboard administrativo", price: 450 },
  { id: "api", label: "Integração de API", price: 500 },
  { id: "pwa", label: "PWA / Offline", price: 400 },
  { id: "analytics", label: "Analytics", price: 250 },
];

export type PortfolioProject = {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  published: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    title: "SmartShop",
    category: "E-commerce Inteligente",
    description: "Plataforma omnichannel com checkout rápido e recomendação IA.",
    image: "/proposta/Paginas.png",
    tags: ["Web", "Next.js", "Stripe"],
    published: "GitHub + Netlify",
  },
  {
    title: "HealthTrack",
    category: "App Android de Saúde",
    description: "Monitoramento de hábitos, agenda médica e relatórios.",
    image: "/proposta/PaginaHome.png",
    tags: ["Android", "Kotlin", "Firebase"],
    published: "GitHub + Deploy interno",
  },
  {
    title: "EduConnect",
    category: "Plataforma de Cursos",
    description: "Gestão de cursos, certificação e área de professor.",
    image: "/proposta/Paginas1.png",
    tags: ["Web", "React", "Node.js"],
    published: "GitHub + Netlify",
  },
  {
    title: "EcoERP",
    category: "Sistema de Gestão",
    description: "Controle de estoque, financeiro e relatórios avançados.",
    image: "/proposta/Paginas2.png",
    tags: ["Sistema", "Django", "API"],
    published: "GitHub + Vercel",
  },
];
