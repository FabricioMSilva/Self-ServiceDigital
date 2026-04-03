"use client";

import { useEffect, useState } from "react";
import useCartStore from "@/app/_features/cart/stores/cartStore";
import useAuthStore from "@/app/_features/auth/stores/authStore";
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

  const formatMoney = (value: number) => `R$ ${value.toFixed(2)}`;

  useEffect(() => {
    if (cart.items.length === 0 && !loading) {
      router.push("/cart");
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
      router.push(`/order-confirmed/${order.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro inesperado no checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-24 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-8 text-4xl font-semibold">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="md:col-span-2 space-y-8">
            {/* Informações do Cliente */}
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
              <h2 className="mb-6 text-2xl font-semibold text-white">
                Informações de Entrega
              </h2>

              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="recipientName"
                      value={orderData.recipientName}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-violet-300/60 focus:ring-2 focus:ring-violet-400/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="recipientEmail"
                      value={orderData.recipientEmail}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-violet-300/60 focus:ring-2 focus:ring-violet-400/20"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      name="recipientPhone"
                      value={orderData.recipientPhone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-violet-300/60 focus:ring-2 focus:ring-violet-400/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">
                      Empresa
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={orderData.company}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-violet-300/60 focus:ring-2 focus:ring-violet-400/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white/75">
                    Observações do Projeto
                  </label>
                  <textarea
                    name="notes"
                    value={orderData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-violet-300/60 focus:ring-2 focus:ring-violet-400/20"
                    placeholder="Detalhes específicos sobre seu projeto..."
                  />
                </div>
              </form>
            </div>

            {/* Método de Pagamento */}
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
              <h2 className="mb-6 text-2xl font-semibold text-white">
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
                    className="flex cursor-pointer items-center gap-4 rounded-xl border px-4 py-3 transition"
                    style={{
                      borderColor: paymentMethod === method.id ? "rgba(167, 139, 250, 0.7)" : "rgba(255,255,255,0.15)",
                      backgroundColor: paymentMethod === method.id ? "rgba(139,92,246,0.18)" : "rgba(255,255,255,0.03)",
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
                      <p className="text-sm text-white/60">{method.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="sticky top-24 h-fit rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
            <h2 className="mb-6 text-2xl font-semibold text-white">
              Resumo do Pedido
            </h2>

            <div className="mb-6 max-h-64 space-y-3 overflow-y-auto border-b border-white/10 pb-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-white/75">{item.label}</span>
                  <span>{formatMoney(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-white/65">
                <span>Subtotal:</span>
                <span>{formatMoney(cart.subtotal)}</span>
              </div>

              <div className="flex justify-between text-white/65">
                <span>Impostos:</span>
                <span>{formatMoney(cart.tax)}</span>
              </div>

              {cart.discount && (
                <div className="flex justify-between text-emerald-300">
                  <span>Desconto:</span>
                  <span>-{formatMoney((cart.subtotal * cart.discount) / 100)}</span>
                </div>
              )}

              <div className="flex justify-between border-t border-white/10 pt-3 text-lg font-semibold">
                <span>Total:</span>
                <span className="text-emerald-300">{formatMoney(cart.total)}</span>
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-xl border border-rose-300/35 bg-rose-500/10 p-3 text-sm text-rose-200">
                {error}
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={loading || cart.items.length === 0}
              className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Processando..."
                : `Confirmar Pagamento - ${formatMoney(cart.total)}`}
            </button>

            <Link
              href="/cart"
              className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              ← Voltar ao Carrinho
            </Link>

            <div className="mt-6 rounded-xl border border-cyan-300/30 bg-cyan-500/10 p-3 text-xs text-cyan-100/90">
              💡 <strong>Teste:</strong> Este é um checkout simulado. Nenhum
              pagamento real será processado.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
