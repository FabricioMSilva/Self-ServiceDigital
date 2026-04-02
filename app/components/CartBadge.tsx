"use client";

import React from "react";
import useCartStore from "@/app/stores/cartStore";
import Link from "next/link";
import * as S from "@/app/styles/components/cartbadge.styles";

export default function CartBadge() {
  const { cart } = useCartStore();
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <S.CartButtonContainer as={Link} href="/carrinho">
      <S.CartButton>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m10 0l2 9m-12-9h14m-7-9v2m0 0v11m0-11V4"
          />
        </svg>
        <span>Carrinho</span>
        {itemCount > 0 && (
          <S.CartBadge>{itemCount}</S.CartBadge>
        )}
      </S.CartButton>
    </S.CartButtonContainer>
  );
}
