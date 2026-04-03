"use client";

import { useEffect, useState } from "react";
import useAuthStore from "@/app/_features/auth/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AdminOrder {
  id: string;
  total: number;
  status: string;
  createdAt: string | Date;
  userInfo?: {
    recipientName?: string;
  };
}

interface AdminMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  status: string;
  createdAt: string | Date;
}

type AdminTab = "dashboard" | "orders" | "messages" | "settings";

const adminTabs: Array<{ id: AdminTab; label: string; icon: string }> = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "orders", label: "Pedidos", icon: "📦" },
  { id: "messages", label: "Mensagens", icon: "💬" },
  { id: "settings", label: "Configurações", icon: "⚙️" },
];

function formatMoney(value: number) {
  return `R$ ${value.toFixed(2)}`;
}

function getOrderStatusStyle(status: string) {
  switch (status.toLowerCase()) {
    case "confirmed":
    case "completed":
      return "bg-emerald-400/15 text-emerald-300 ring-emerald-300/30";
    case "pending":
    case "processing":
      return "bg-amber-400/15 text-amber-300 ring-amber-300/30";
    case "cancelled":
      return "bg-rose-400/15 text-rose-300 ring-rose-300/30";
    default:
      return "bg-slate-400/15 text-slate-300 ring-slate-300/30";
  }
}

export default function AdminPanel() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/login");
      return;
    }

    fetchData();
  }, [user, router]);

  const fetchData = async () => {
    try {
      const [ordersRes, messagesRes] = await Promise.all([
        fetch("/api/orders/create"),
        fetch("/api/contact/send"),
      ]);

      if (ordersRes.ok) {
        const ordersData: AdminOrder[] = await ordersRes.json();
        setOrders(ordersData);
      }
      if (messagesRes.ok) {
        const messagesData: AdminMessage[] = await messagesRes.json();
        setMessages(messagesData);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const unreadMessages = messages.filter((message) => message.status === "new").length;
  const estimatedRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

  const stats = [
    {
      label: "Total de Pedidos",
      value: String(orders.length),
      tone: "from-cyan-500/20 to-blue-500/10 text-cyan-200 ring-cyan-300/25",
    },
    {
      label: "Mensagens",
      value: String(messages.length),
      tone: "from-violet-500/20 to-indigo-500/10 text-violet-200 ring-violet-300/25",
    },
    {
      label: "Receita Estimada",
      value: formatMoney(estimatedRevenue),
      tone: "from-emerald-500/20 to-teal-500/10 text-emerald-200 ring-emerald-300/25",
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        <div className="text-center">
          <div className="mb-4 inline-block">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-white/10 border-t-violet-400" />
          </div>
          <p className="text-lg text-white/85">Carregando painel administrativo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-7xl px-4 pb-28 pt-28 md:pt-30">
        <section className="relative mb-6 overflow-hidden rounded-3xl border border-white/10 bg-black/30 p-6 shadow-[0_20px_60px_rgba(3,7,18,0.45)] backdrop-blur-xl md:p-8">
          <div className="pointer-events-none absolute -left-10 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-violet-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-14 top-0 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                Administração
              </p>
              <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
                Painel Administrativo
              </h1>
              <p className="mt-2 text-sm text-white/70">Bem-vindo, {user?.name}.</p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-white/15"
            >
              ← Voltar ao Site
            </Link>
          </div>
        </section>

        <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className={`rounded-2xl border border-white/10 bg-gradient-to-br ${stat.tone} p-5 shadow-[0_12px_40px_rgba(2,6,23,0.35)] ring-1`}
            >
              <p className="text-xs font-medium uppercase tracking-wide text-white/65">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold md:text-3xl">{stat.value}</p>
            </article>
          ))}
        </section>

        <section className="mb-6 overflow-x-auto rounded-2xl border border-white/10 bg-black/25 p-2 backdrop-blur-xl">
          <div className="flex min-w-max gap-2">
            {adminTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${isActive
                      ? "bg-white/15 text-white shadow-[0_8px_28px_rgba(139,92,246,0.32)]"
                      : "text-white/70 hover:bg-white/8 hover:text-white"
                    }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {activeTab === "dashboard" && (
          <section className="grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-white/10 bg-black/25 p-5 backdrop-blur-xl md:col-span-2">
              <h2 className="mb-4 text-xl font-semibold text-white">Visão Geral</h2>
              <div className="grid gap-3 text-sm text-white/80 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-white/60">Últimos Pedidos</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {orders.length > 0 ? `${orders.length} pedidos` : "Nenhum pedido"}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-white/60">Mensagens Não Lidas</p>
                  <p className="mt-1 text-lg font-semibold text-white">{unreadMessages}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:col-span-2">
                  <p className="text-white/60">Taxa de Conversão</p>
                  <p className="mt-1 text-lg font-semibold text-white">Calculando...</p>
                </div>
              </div>
            </article>

            <aside className="rounded-2xl border border-violet-400/25 bg-gradient-to-b from-violet-500/20 to-fuchsia-500/10 p-5">
              <h3 className="text-base font-semibold text-white">Resumo rápido</h3>
              <p className="mt-2 text-sm text-white/75">
                Ambiente administrativo pronto para acompanhamento em tempo real de pedidos e atendimento.
              </p>
            </aside>
          </section>
        )}

        {activeTab === "orders" && (
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-black/25 backdrop-blur-xl">
            <div className="border-b border-white/10 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Pedidos Recentes</h2>
            </div>
            {orders.length === 0 ? (
              <p className="px-6 py-10 text-sm text-white/65">Nenhum pedido ainda.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-sm">
                  <thead className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-white/55">
                    <tr>
                      <th className="px-6 py-3">ID</th>
                      <th className="px-6 py-3">Cliente</th>
                      <th className="px-6 py-3">Total</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-white/5 text-white/85 transition hover:bg-white/5">
                        <td className="px-6 py-3 font-mono text-cyan-300">{order.id}</td>
                        <td className="px-6 py-3">{order.userInfo?.recipientName || "Guest"}</td>
                        <td className="px-6 py-3 font-semibold">{formatMoney(order.total)}</td>
                        <td className="px-6 py-3">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${getOrderStatusStyle(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-white/60">
                          {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {activeTab === "messages" && (
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-black/25 backdrop-blur-xl">
            <div className="border-b border-white/10 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Mensagens de Contato</h2>
            </div>
            {messages.length === 0 ? (
              <p className="px-6 py-10 text-sm text-white/65">Nenhuma mensagem.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-sm">
                  <thead className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-white/55">
                    <tr>
                      <th className="px-6 py-3">Nome</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Assunto</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg) => (
                      <tr key={msg.id} className="border-b border-white/5 text-white/85 transition hover:bg-white/5">
                        <td className="px-6 py-3">{msg.name}</td>
                        <td className="px-6 py-3 text-white/65">{msg.email}</td>
                        <td className="px-6 py-3">{msg.subject}</td>
                        <td className="px-6 py-3">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${msg.status === "new"
                              ? "bg-amber-400/15 text-amber-300 ring-amber-300/30"
                              : "bg-slate-400/15 text-slate-300 ring-slate-300/30"
                              }`}
                          >
                            {msg.status === "new" ? "Novo" : "Lido"}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-white/60">
                          {new Date(msg.createdAt).toLocaleDateString("pt-BR")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {activeTab === "settings" && (
          <section className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur-xl lg:col-span-2">
              <h2 className="mb-5 text-xl font-semibold text-white">Configurações</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/75">Email de Notificações</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/40 outline-none transition focus:border-violet-300/60 focus:ring-2 focus:ring-violet-400/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white/75">Telefone para Suporte</label>
                  <input
                    type="tel"
                    defaultValue={user?.phone}
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/40 outline-none transition focus:border-violet-300/60 focus:ring-2 focus:ring-violet-400/20"
                  />
                </div>

                <button className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-110">
                  Salvar Configurações
                </button>
              </div>
            </div>

            <aside className="rounded-2xl border border-rose-400/35 bg-rose-500/10 p-6">
              <h3 className="mb-3 text-lg font-semibold text-rose-300">Zona de Risco</h3>
              <p className="mb-4 text-sm text-rose-200/80">
                Ações nesta área afetam a aplicação inteira. Utilize com cautela.
              </p>
              <button className="inline-flex items-center justify-center rounded-xl bg-rose-500/70 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-500">
                Limpar Cache
              </button>
            </aside>
          </section>
        )}
      </div>
    </div>
  );
}
