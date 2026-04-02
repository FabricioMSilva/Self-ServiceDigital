import { NextRequest, NextResponse } from "next/server";

// Simulação de banco de dados de pedidos
let orders: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const { userId, items, subtotal, tax, total, paymentMethod, paymentId, userInfo } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Pedido deve conter itens" },
        { status: 400 }
      );
    }

    const order = {
      id: `ord_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      items,
      subtotal,
      tax,
      total,
      status: "confirmed",
      paymentMethod,
      paymentId,
      userInfo,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    orders.push(order);

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar pedido" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");

    if (userId) {
      const userOrders = orders.filter((o) => o.userId === userId);
      return NextResponse.json(userOrders);
    }

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar pedidos" },
      { status: 500 }
    );
  }
}
