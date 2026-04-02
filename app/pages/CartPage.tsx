"use client";

import React from "react";
import useCartStore from "@/app/stores/cartStore";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeItem, updateQuantity, clearCart } = useCartStore();

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#040b1f] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Seu Carrinho está Vazio</h1>
          <p className="text-gray-400 mb-8">
            Adicione alguns serviços para começar!
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            Voltar ao Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040b1f] text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-10">Carrinho de Compras</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Itens do carrinho */}
          <div className="md:col-span-2">
            <div className="bg-slate-900 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="text-left p-4">Serviço</th>
                    <th className="text-right p-4">Preço</th>
                    <th className="text-center p-4">Quantidade</th>
                    <th className="text-right p-4">Total</th>
                    <th className="text-center p-4">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {cart.items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800 transition">
                      <td className="p-4">
                        <div>
                          <p className="font-semibold">{item.label}</p>
                          {item.type && (
                            <p className="text-sm text-gray-400">
                              {item.type.toUpperCase()}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="text-right p-4">
                        R$ {item.price.toFixed(2)}
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
                          className="w-16 px-2 py-1 bg-slate-800 rounded text-center"
                        />
                      </td>
                      <td className="text-right p-4 font-semibold">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="text-center p-4">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition text-sm"
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
          <div className="bg-slate-900 rounded-lg p-6 h-fit sticky top-4">
            <h2 className="text-2xl font-bold mb-6">Resumo</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal:</span>
                <span>R$ {cart.subtotal.toFixed(2)}</span>
              </div>

              {cart.discount && (
                <div className="flex justify-between text-green-400">
                  <span>Desconto ({cart.discount}%):</span>
                  <span>
                    -R${" "}
                    {((cart.subtotal * cart.discount) / 100).toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-gray-400 border-t border-slate-700 pt-4">
                <span>Impostos (10%):</span>
                <span>R$ {cart.tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-xl font-bold border-t border-slate-700 pt-4">
                <span>Total:</span>
                <span className="text-green-400">
                  R$ {cart.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/checkout" className="block">
                <button className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition">
                  Prosseguir para Checkout
                </button>
              </Link>

              <button
                onClick={clearCart}
                className="w-full px-6 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg transition"
              >
                Limpar Carrinho
              </button>

              <Link href="/" className="block">
                <button className="w-full px-6 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg transition">
                  Continuar Comprando
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
