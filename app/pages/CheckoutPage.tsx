"use client";

import { useEffect, useState } from "react";
import useCartStore from "@/app/stores/cartStore";
import useAuthStore from "@/app/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderData, setOrderData] = useState({
    recipientName: user?.name || "",
    recipientEmail: user?.email || "",
    recipientPhone: user?.phone || "",
    company: user?.company || "",
    notes: "",
    promoCode: "",
  });

  useEffect(() => {
    if (cart.items.length === 0 && !loading) {
      router.push("/carrinho");
    }
  }, [cart.items.length, router, loading]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOrderData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validações
      if (!orderData.recipientName || !orderData.recipientEmail) {
        throw new Error("Nome e email são obrigatórios");
      }

      // Criar intenção de pagamento (simulado)
      const paymentResponse = await fetch("/api/payments/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: cart.total,
          currency: "BRL",
          description: `Order from ${orderData.recipientName}`,
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error("Erro ao criar pagamento");
      }

      const paymentData = await paymentResponse.json();

      // Criar pedido
      const orderResponse = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id || "guest",
          items: cart.items,
          subtotal: cart.subtotal,
          tax: cart.tax,
          total: cart.total,
          paymentMethod,
          paymentId: paymentData.id,
          userInfo: orderData,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error("Erro ao criar pedido");
      }

      const order = await orderResponse.json();

      // Limpar carrinho
      clearCart();

      // Redirecionar para página de sucesso
      router.push(`/pedido-confirmado/${order.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040b1f] text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-10">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="md:col-span-2 space-y-8">
            {/* Informações do Cliente */}
            <div className="bg-slate-900 rounded-lg p-6 border border-cyan-500/30">
              <h2 className="text-2xl font-bold mb-6 text-cyan-300">
                Informações de Entrega
              </h2>

              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="recipientName"
                      value={orderData.recipientName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 focus:border-cyan-400 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="recipientEmail"
                      value={orderData.recipientEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 focus:border-cyan-400 outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      name="recipientPhone"
                      value={orderData.recipientPhone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={orderData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 focus:border-cyan-400 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Observações do Projeto
                  </label>
                  <textarea
                    name="notes"
                    value={orderData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 focus:border-cyan-400 outline-none"
                    placeholder="Detalhes específicos sobre seu projeto..."
                  />
                </div>
              </form>
            </div>

            {/* Método de Pagamento */}
            <div className="bg-slate-900 rounded-lg p-6 border border-cyan-500/30">
              <h2 className="text-2xl font-bold mb-6 text-cyan-300">
                Método de Pagamento
              </h2>

              <div className="space-y-3">
                {[
                  {
                    id: "card",
                    label: "💳 Cartão de Crédito",
                    desc: "Parcelamos em até 12x",
                  },
                  { id: "pix", label: "🔐 PIX", desc: "Transferência instantânea" },
                  {
                    id: "boleto",
                    label: "📋 Boleto Bancário",
                    desc: "Vencimento em 3 dias",
                  },
                ].map((method) => (
                  <label
                    key={method.id}
                    className="flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition"
                    style={{
                      borderColor:
                        paymentMethod === method.id ? "#06b6d4" : "#334155",
                      backgroundColor:
                        paymentMethod === method.id ? "#164e63" : "#1e293b",
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="font-semibold">{method.label}</p>
                      <p className="text-sm text-slate-400">{method.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="bg-slate-900 rounded-lg p-6 border border-cyan-500/30 h-fit sticky top-4">
            <h2 className="text-2xl font-bold mb-6 text-cyan-300">
              Resumo do Pedido
            </h2>

            <div className="space-y-3 max-h-64 overflow-y-auto mb-6 pb-6 border-b border-slate-700">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-slate-300">{item.label}</span>
                  <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span>R$ {cart.subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Impostos:</span>
                <span>R$ {cart.tax.toFixed(2)}</span>
              </div>

              {cart.discount && (
                <div className="flex justify-between text-green-400">
                  <span>Desconto:</span>
                  <span>
                    -R$ {((cart.subtotal * cart.discount) / 100).toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-lg font-bold border-t border-slate-700 pt-3">
                <span>Total:</span>
                <span className="text-green-400">
                  R$ {cart.total.toFixed(2)}
                </span>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-300 text-sm mb-4">
                {error}
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={loading || cart.items.length === 0}
              className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg font-bold transition"
            >
              {loading
                ? "Processando..."
                : `Confirmar Pagamento - R$ ${cart.total.toFixed(2)}`}
            </button>

            <Link href="/carrinho">
              <button className="w-full mt-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition">
                ← Voltar ao Carrinho
              </button>
            </Link>

            <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-xs text-blue-300">
              💡 <strong>Teste:</strong> Este é um checkout simulado. Nenhum
              pagamento real será processado.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
