import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://self-servicedigital.netlify.app"),
  title: "Self-ServiceDigital | Web, Android e Sistemas Sob Medida",
  description:
    "Desenvolvimento profissional de sites, apps Android e sistemas com orçamento flexível e entrega por etapas.",
  openGraph: {
    title: "Self-ServiceDigital | Seu Projeto, Sua Escolha, Nosso Código",
    description:
      "Crie sua solução web, mobile ou corporativa com catálogo dinâmico e pagamento por etapa.",
    images: [
      {
        url: "/FotoCEO/Fabricio Silva.png",
        width: 1200,
        height: 630,
        alt: "Fabricio Silva - CEO Self-ServiceDigital",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Self-ServiceDigital | Web, Android e Sistemas Sob Medida",
    description:
      "Desenvolvimento profissional de sites, apps Android e sistemas com orçamento flexível e entrega por etapas.",
    images: ["/FotoCEO/Fabricio Silva.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${roboto.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#06070d] text-white">{children}</body>
    </html>
  );
}
