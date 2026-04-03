export default function PaymentPlan() {
  const steps = [
    { label: "Planeje", description: "Defina escopo, tecnologia e prazo" },
    { label: "Pague", description: "Pagamento por etapas conforme entrega" },
    { label: "Receba", description: "Entrega progressiva e validação" },
  ];

  return (
    <section id="pagamento" className="my-16 rounded-2xl border border-cyan-500/20 bg-black/40 p-6">
      <h3 className="text-3xl font-bold text-cyan-300">Pagamentos Flexíveis</h3>
      <p className="mt-2 text-slate-200">Parcele sem pressa, alinhando produção e investimento.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {steps.map((step) => (
          <article key={step.label} className="rounded-xl border border-blue-500/40 bg-slate-900/70 p-4">
            <h4 className="text-lg font-bold text-cyan-100">{step.label}</h4>
            <p className="mt-2 text-slate-200">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
