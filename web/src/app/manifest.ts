import type { MetadataRoute } from "next";

// O manifest é o "RG" do PWA: diz ao celular o nome, o ícone e as cores
// do app quando ele é instalado na tela inicial.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "App de Leitura",
    short_name: "Leitura",
    description: "Organize suas leituras e entenda melhor o que você lê.",
    start_url: "/",
    display: "standalone", // abre em tela cheia, sem a barra do navegador
    background_color: "#ffffff",
    theme_color: "#4c1d95",
    lang: "pt-BR",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      // "maskable": versão que o Android pode recortar em círculo ou gota
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
