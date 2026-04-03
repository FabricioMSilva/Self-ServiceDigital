import { NextRequest, NextResponse } from "next/server";

interface OrderItem {
  id: string;
  label: string;
  price: number;
  quantity: number;
}

interface StoredOrder {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: "confirmed";
  paymentMethod: string;
  paymentId?: string;
  userInfo?: unknown;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateOrderPayload {
  userId?: string;
  items?: OrderItem[];
  subtotal?: number;
  tax?: number;
  total?: number;
  paymentMethod?: string;
  paymentId?: string;
  userInfo?: unknown;
}

// Mock de pedidos em memória para destravar checkout e painel administrativo.
const orders: StoredOrder[] = [];

export async function POST(request: NextRequest) {
  try {
    const { userId, items, subtotal, tax, total, paymentMethod, paymentId, userInfo }: CreateOrderPayload = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Pedido deve conter itens" },
        { status: 400 }
      );
    }

    const order: StoredOrder = {
      id: `ord_${Math.random().toString(36).substr(2, 9)}`,
      userId: userId ?? "guest",
      items,
      subtotal: subtotal ?? 0,
      tax: tax ?? 0,
      total: total ?? 0,
      status: "confirmed",
      paymentMethod: paymentMethod ?? "card",
      paymentId,
      userInfo,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    orders.push(order);

    return NextResponse.json(order, { status: 201 });
  } catch {
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
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar pedidos" },
      { status: 500 }
    );
  }
}
