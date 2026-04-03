"use client";

import Link from "next/link";

interface ConfirmedOrderItem {
  label: string;
  price: number;
}

interface ConfirmedOrder {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  items: ConfirmedOrderItem[];
}

function buildDeterministicOrder(orderId: string): ConfirmedOrder {
  const seed = Array.from(orderId).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const total = 500 + (seed % 5000);
  const createdAt = new Date(2026, (seed % 12), (seed % 28) + 1).toLocaleDateString("pt-BR");

  return {
    id: orderId,
    total,
    status: "confirmed",
    createdAt,
    items: [
      { label: "Header/Menu responsivo", price: 300 },
      { label: "Páginas (3×)", price: 750 },
      { label: "Footer completo", price: 200 },
    ],
  };
}

export default function OrderConfirmedPage({
  params,
}: {
  params: { orderId: string };
}) {
  const order = buildDeterministicOrder(params.orderId);
  const formatMoney = (value: number) => `R$ ${value.toFixed(2)}`;

  return (
    <div className="min-h-screen py-24 text-white">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-3xl border border-emerald-300/30 bg-black/30 p-8 text-center shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl">
          {/* Ícone de sucesso */}
          <div className="mb-6 inline-block">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-emerald-300/50 bg-emerald-500/20">
              <span className="text-4xl">✓</span>
            </div>
          </div>

          <h1 className="mb-2 text-4xl font-semibold text-emerald-300">
            Pedido Confirmado!
          </h1>

          <p className="mb-8 text-white/65">
            Obrigado por confiar em nós. Seu pedido foi processado com sucesso.
          </p>

          <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-white/55">Número do Pedido</p>
                <p className="text-lg font-semibold text-cyan-300">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-white/55">Data</p>
                <p className="text-lg font-semibold">{order.createdAt}</p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <p className="mb-3 text-sm text-white/55">Itens do Pedido:</p>
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div
                    key={`${item.label}-${idx}`}
                    className="flex justify-between text-sm text-white/80"
                  >
                    <span>{item.label}</span>
                    <span>{formatMoney(item.price)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-6">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total do Pedido:</span>
                <span className="text-emerald-300">{formatMoney(order.total)}</span>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-cyan-300/30 bg-cyan-500/10 p-4">
            <p className="text-sm text-cyan-100/90">
              <strong>📧 Para quê?</strong> Um email de confirmação foi enviado
              com todos os detalhes do seu pedido. Fique atento ao nosso contato
              para iniciarmos o projeto!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Voltar ao Início
            </Link>
            <Link
              href="/my-orders"
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/15 bg-white/5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              Ver Meus Pedidos
            </Link>
          </div>
        </div>

        <div className="mt-10 text-center">
          <h2 className="mb-4 text-2xl font-semibold">Próximos Passos</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                num: "1",
                title: "Análise",
                desc: "Vamos analisar seus requisitos",
              },
              {
                num: "2",
                title: "Proposta",
                desc: "Enviaremos uma proposta detalhada",
              },
              {
                num: "3",
                title: "Desenvolvimento",
                desc: "Iniciaremos o projeto",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-xl"
              >
                <div className="mb-2 text-3xl font-semibold text-cyan-300">
                  {step.num}
                </div>
                <h3 className="mb-1 font-semibold">{step.title}</h3>
                <p className="text-sm text-white/60">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
