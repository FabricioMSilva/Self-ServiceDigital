"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrderConfirmedPage({
  params,
}: {
  params: { orderId: string };
}) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular busca de pedido
    const mockOrder = {
      id: params.orderId,
      total: Math.random() * 5000 + 500,
      status: "confirmed",
      createdAt: new Date().toLocaleDateString("pt-BR"),
      items: [
        { label: "Header/Menu responsivo", price: 300 },
        { label: "Páginas (3×)", price: 750 },
        { label: "Footer completo", price: 200 },
      ],
    };
    setOrder(mockOrder);
    setLoading(false);
  }, [params.orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#040b1f] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block">
            <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-xl">Carregando pedido...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040b1f] text-white py-20">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-slate-900 rounded-2xl border border-green-500/30 p-8 text-center">
          {/* Ícone de sucesso */}
          <div className="mb-6 inline-block">
            <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
              <span className="text-4xl">✓</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-2 text-green-400">
            Pedido Confirmado!
          </h1>

          <p className="text-slate-400 mb-8">
            Obrigado por confiar em nós. Seu pedido foi processado com sucesso.
          </p>

          {order && (
            <div className="bg-slate-800/50 rounded-lg p-6 mb-8 text-left">
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-slate-400 text-sm">Número do Pedido</p>
                  <p className="text-lg font-bold text-cyan-300">{order.id}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Data</p>
                  <p className="text-lg font-bold">{order.createdAt}</p>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6">
                <p className="text-slate-400 text-sm mb-3">Itens do Pedido:</p>
                <div className="space-y-2">
                  {order.items.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex justify-between text-sm text-slate-300"
                    >
                      <span>{item.label}</span>
                      <span>R$ {item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-700 mt-6 pt-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total do Pedido:</span>
                  <span className="text-green-400">
                    R$ {order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-300">
              <strong>📧 Para quê?</strong> Um email de confirmação foi enviado
              com todos os detalhes do seu pedido. Fique atento ao nosso contato
              para iniciarmos o projeto!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/" className="flex-1">
              <button className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-bold transition">
                Voltar ao Início
              </button>
            </Link>
            <Link href="/meus-pedidos" className="flex-1">
              <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-bold transition">
                Ver Meus Pedidos
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Próximos Passos</h2>
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
                className="bg-slate-900/50 rounded-lg p-4 border border-slate-700"
              >
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {step.num}
                </div>
                <h3 className="font-bold mb-1">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
