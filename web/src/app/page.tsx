import { StatusApi } from "@/components/StatusApi";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 py-12">
      <h1 className="text-3xl font-semibold text-violet-900 dark:text-violet-200">
        App de Leitura
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Etapa 0: o esqueleto do projeto está de pé. A estante vem na Etapa 1.
      </p>
      <StatusApi />
    </main>
  );
}
