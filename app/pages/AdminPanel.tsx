"use client";

import { useEffect, useState } from "react";
import useAuthStore from "@/app/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminPanel() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [orders, setOrders] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
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
        setOrders(await ordersRes.json());
      }
      if (messagesRes.ok) {
        setMessages(await messagesRes.json());
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: "Total de Pedidos", value: orders.length, color: "bg-blue-500/20 text-blue-300" },
    { label: "Mensagens", value: messages.length, color: "bg-green-500/20 text-green-300" },
    { label: "Receita Estimada", value: `R$ ${orders.reduce((sum, o) => sum + (o.total || 0), 0).toFixed(2)}`, color: "bg-yellow-500/20 text-yellow-300" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#040b1f] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block">
            <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-xl">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040b1f] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Painel Administrativo</h1>
            <p className="text-slate-400">Bem-vindo, {user?.name}!</p>
          </div>
          <div className="flex gap-2">
            <Link href="/">
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition">
                ← Voltar ao Site
              </button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-lg p-6 border border-slate-700 ${stat.color}`}
            >
              <p className="text-sm opacity-75 mb-2">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-700 overflow-x-auto">
          {[
            { id: "dashboard", label: "📊 Dashboard" },
            { id: "orders", label: "📦 Pedidos" },
            { id: "messages", label: "💬 Mensagens" },
            { id: "settings", label: "⚙️ Configurações" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-semibold transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-b-2 border-cyan-500 text-cyan-300"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
              <h2 className="text-2xl font-bold mb-4">Visão Geral</h2>
              <div className="space-y-3">
                <p className="text-slate-300">
                  <strong>Últimos Pedidos:</strong> {orders.length > 0 ? `${orders.length} pedidos` : "Nenhum pedido"}
                </p>
                <p className="text-slate-300">
                  <strong>Mensagens Não Lidas:</strong> {messages.filter((m) => m.status === "new").length}
                </p>
                <p className="text-slate-300">
                  <strong>Taxa de Conversão:</strong> Calculando...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">Pedidos Recentes</h2>
            {orders.length === 0 ? (
              <p className="text-slate-400">Nenhum pedido ainda.</p>
            ) : (
              <table className="w-full text-sm">
                <thead className="border-b border-slate-700">
                  <tr>
                    <th className="text-left py-2">ID</th>
                    <th className="text-left py-2">Cliente</th>
                    <th className="text-left py-2">Total</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                      <td className="py-3 font-mono text-cyan-400">{order.id}</td>
                      <td className="py-3">{order.userInfo?.recipientName || "Guest"}</td>
                      <td className="py-3 font-semibold">R$ {order.total.toFixed(2)}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-400">
                        {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">Mensagens de Contato</h2>
            {messages.length === 0 ? (
              <p className="text-slate-400">Nenhuma mensagem.</p>
            ) : (
              <table className="w-full text-sm">
                <thead className="border-b border-slate-700">
                  <tr>
                    <th className="text-left py-2">Nome</th>
                    <th className="text-left py-2">Email</th>
                    <th className="text-left py-2">Assunto</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg) => (
                    <tr key={msg.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                      <td className="py-3">{msg.name}</td>
                      <td className="py-3 text-slate-400">{msg.email}</td>
                      <td className="py-3">{msg.subject}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            msg.status === "new"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-slate-600/30 text-slate-300"
                          }`}
                        >
                          {msg.status === "new" ? "Novo" : "Lido"}
                        </span>
                      </td>
                      <td className="py-3 text-slate-400">
                        {new Date(msg.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
              <h2 className="text-2xl font-bold mb-4">Configurações</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Email de Notificações</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full px-4 py-2 bg-slate-800 rounded-lg border border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Telefone para Suporte</label>
                  <input
                    type="tel"
                    defaultValue={user?.phone}
                    className="w-full px-4 py-2 bg-slate-800 rounded-lg border border-slate-700"
                  />
                </div>

                <button className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold transition">
                  Salvar Configurações
                </button>
              </div>
            </div>

            <div className="bg-red-500/10 rounded-lg p-6 border border-red-500/30">
              <h3 className="text-lg font-bold text-red-400 mb-3">Zona de Risco</h3>
              <button className="px-6 py-2 bg-red-600/50 hover:bg-red-600/70 rounded-lg font-semibold transition">
                Limpar Cache
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
