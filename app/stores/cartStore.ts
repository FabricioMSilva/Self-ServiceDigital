"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Cart } from "@/app/types";

interface CartStore {
  cart: Cart;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyDiscount: (discountPercent: number) => void;
  removeDiscount: () => void;
  calculateTotals: () => void;
}

const TAX_RATE = 0.1; // 10% de imposto

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: {
        items: [],
        total: 0,
        subtotal: 0,
        tax: 0,
      },

      addItem: (item: CartItem) => {
        set((state) => {
          const existingItem = state.cart.items.find((i) => i.id === item.id);

          if (existingItem) {
            existingItem.quantity += item.quantity;
          } else {
            state.cart.items.push(item);
          }

          return { cart: { ...state.cart } };
        });

        get().calculateTotals();
      },

      removeItem: (id: string) => {
        set((state) => {
          state.cart.items = state.cart.items.filter((i) => i.id !== id);
          return { cart: { ...state.cart } };
        });

        get().calculateTotals();
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => {
          const item = state.cart.items.find((i) => i.id === id);
          if (item) {
            item.quantity = quantity;
          }
          return { cart: { ...state.cart } };
        });

        get().calculateTotals();
      },

      clearCart: () => {
        set({
          cart: {
            items: [],
            total: 0,
            subtotal: 0,
            tax: 0,
          },
        });
      },

      applyDiscount: (discountPercent: number) => {
        set((state) => {
          state.cart.discount = discountPercent;
          return { cart: { ...state.cart } };
        });

        get().calculateTotals();
      },

      removeDiscount: () => {
        set((state) => {
          state.cart.discount = undefined;
          return { cart: { ...state.cart } };
        });

        get().calculateTotals();
      },

      calculateTotals: () => {
        const state = get();
        const subtotal = state.cart.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        const discountAmount = state.cart.discount
          ? (subtotal * state.cart.discount) / 100
          : 0;

        const subtotalAfterDiscount = subtotal - discountAmount;
        const tax = subtotalAfterDiscount * TAX_RATE;
        const total = subtotalAfterDiscount + tax;

        set((state) => {
          state.cart.subtotal = subtotal;
          state.cart.tax = tax;
          state.cart.total = total;
          return { cart: { ...state.cart } };
        });
      },
    }),
    {
      name: "cart-store",
    }
  )
);

export default useCartStore;
