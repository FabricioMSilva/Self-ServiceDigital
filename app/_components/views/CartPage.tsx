"use client";

import React from "react";
import useCartStore from "@/app/_features/cart/stores/cartStore";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeItem, updateQuantity, clearCart } = useCartStore();

  const formatMoney = (value: number) => `R$ ${value.toFixed(2)}`;

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen py-24 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-10 shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl">
            <h1 className="mb-3 text-4xl font-semibold">Seu Carrinho está Vazio</h1>
            <p className="mx-auto mb-8 max-w-xl text-white/65">
            Adicione alguns serviços para começar!
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-8 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Voltar ao Catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-8 text-4xl font-semibold">Carrinho de Compras</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Itens do carrinho */}
          <div className="md:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl">
              <table className="w-full min-w-[640px]">
                <thead className="border-b border-white/10 bg-white/5 text-left text-xs uppercase tracking-wide text-white/55">
                  <tr>
                    <th className="p-4">Serviço</th>
                    <th className="p-4 text-right">Preço</th>
                    <th className="p-4 text-center">Quantidade</th>
                    <th className="p-4 text-right">Total</th>
                    <th className="p-4 text-center">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {cart.items.map((item) => (
                    <tr key={item.id} className="transition hover:bg-white/5">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-white">{item.label}</p>
                          {item.type && (
                            <p className="text-xs uppercase tracking-wide text-white/50">
                              {item.type.toUpperCase()}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right text-white/80">
                        {formatMoney(item.price)}
                      </td>
                      <td className="text-center p-4">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="w-16 rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-center text-white outline-none focus:border-violet-300/60"
                        />
                      </td>
                      <td className="p-4 text-right font-semibold text-white">
                        {formatMoney(item.price * item.quantity)}
                      </td>
                      <td className="text-center p-4">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm font-medium text-rose-300 transition hover:text-rose-200"
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Resumo do carrinho */}
          <div className="sticky top-24 h-fit rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
            <h2 className="mb-6 text-2xl font-semibold">Resumo</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-white/65">
                <span>Subtotal:</span>
                <span>{formatMoney(cart.subtotal)}</span>
              </div>

              {cart.discount && (
                <div className="flex justify-between text-emerald-300">
                  <span>Desconto ({cart.discount}%):</span>
                  <span>
                    -{formatMoney((cart.subtotal * cart.discount) / 100)}
                  </span>
                </div>
              )}

              <div className="flex justify-between border-t border-white/10 pt-4 text-white/65">
                <span>Impostos (10%):</span>
                <span>{formatMoney(cart.tax)}</span>
              </div>

              <div className="flex justify-between border-t border-white/10 pt-4 text-xl font-semibold">
                <span>Total:</span>
                <span className="text-emerald-300">{formatMoney(cart.total)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/checkout"
                className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Prosseguir para Checkout
              </Link>

              <button
                onClick={clearCart}
                className="w-full rounded-xl border border-rose-300/30 bg-rose-500/10 px-6 py-2.5 text-sm font-medium text-rose-200 transition hover:bg-rose-500/20"
              >
                Limpar Carrinho
              </button>

              <Link
                href="/"
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
