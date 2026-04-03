import PageShell from "@/app/_components/templates/PageShell";

export default function MyOrdersPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 pb-28 pt-28 md:pt-30">
        <section className="rounded-3xl border border-white/10 bg-black/30 p-8 shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Orders</p>
          <h1 className="mb-2 text-4xl font-semibold text-white">My Orders</h1>
          <p className="mb-8 text-white/65">Track all your orders from this page.</p>

          <div className="grid gap-4 sm:grid-cols-3">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-wide text-white/55">Pending</p>
              <p className="mt-2 text-2xl font-semibold text-amber-300">0</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-wide text-white/55">In Progress</p>
              <p className="mt-2 text-2xl font-semibold text-cyan-300">0</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-wide text-white/55">Completed</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-300">0</p>
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
