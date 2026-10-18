import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "App de Leitura",
  description: "Organize suas leituras e entenda melhor o que você lê.",
  appleWebApp: { capable: true, title: "Leitura", statusBarStyle: "default" },
};

// Cor da barra de status do celular quando o app está aberto
export const viewport: Viewport = {
  themeColor: "#4c1d95",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: extensões do navegador (ex.: BRy Signer) adicionam
    // atributos no <html> antes do React carregar. Isso ignora só os atributos
    // desta tag, não esconde erros dos componentes de dentro.
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
