import PageShell from "@/app/components/PageShell";

export default function MessagesPage() {
  return (
    <PageShell>
      <div className="max-w-2xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-2">Meus Pedidos</h1>
        <p className="text-slate-400 mb-8">Aqui você pode acompanhar todos os seus pedidos.</p>

        <div className="bg-slate-900 rounded-lg p-8 border border-cyan-500/30">
          <p className="text-slate-400">Funcionalidade em desenvolvimento...</p>
        </div>
      </div>
    </PageShell>
  );
}
