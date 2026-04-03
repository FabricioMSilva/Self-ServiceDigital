import PageShell from "@/app/_components/templates/PageShell";

export default function ProfilePage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 pb-28 pt-28 md:pt-30">
        <section className="rounded-3xl border border-white/10 bg-black/30 p-8 shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Account</p>
          <h1 className="mb-2 text-4xl font-semibold text-white">My Profile</h1>
          <p className="mb-8 text-white/65">Manage your personal information and preferences.</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-base font-semibold text-white">Informações pessoais</h2>
              <p className="mt-2 text-sm text-white/60">Atualize nome, telefone e dados de contato.</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-base font-semibold text-white">Preferências</h2>
              <p className="mt-2 text-sm text-white/60">Controle notificações e configurações da conta.</p>
            </article>
          </div>

          <div className="mt-6 rounded-xl border border-cyan-300/30 bg-cyan-500/10 p-4 text-sm text-cyan-100/90">
            Feature under development...
          </div>
        </section>
      </div>
    </PageShell>
  );
}
