"use client";
// "use client" = este componente roda no navegador (e não no servidor),
// porque usa estado (useState) e efeitos (useEffect).

import { useEffect, useState } from "react";

type Status = "verificando" | "ok" | "fora do ar";

// Variáveis com prefixo NEXT_PUBLIC_ ficam visíveis no navegador.
// Nunca coloque segredo (chave de API, senha) numa variável NEXT_PUBLIC_.
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export function StatusApi() {
  const [status, setStatus] = useState<Status>("verificando");

  // useEffect roda depois que o componente aparece na tela,
  // parecido com um "on startup". O [] no final = roda só uma vez.
  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then((res) => setStatus(res.ok ? "ok" : "fora do ar"))
      .catch(() => setStatus("fora do ar"));
  }, []);

  const cor = {
    verificando: "bg-zinc-400",
    ok: "bg-green-500",
    "fora do ar": "bg-red-500",
  }[status];

  return (
    <div className="flex items-center gap-2 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <span className={`h-3 w-3 rounded-full ${cor}`} />
      <span>
        Backend (FastAPI): <strong>{status}</strong>
      </span>
    </div>
  );
}
