import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, description } = await request.json();

    if (!amount || !currency) {
      return NextResponse.json(
        { error: "Valores obrigatórios faltando" },
        { status: 400 }
      );
    }

    // Mock de payment intent para permitir o fluxo de checkout sem cobrança real.
    const mockPaymentIntent = {
      id: `pi_${Math.random().toString(36).substr(2, 9)}`,
      amount: Math.round(amount * 100), // em centavos
      currency: currency.toUpperCase(),
      status: "requires_payment_method",
      client_secret: `${Math.random().toString(36).substr(2, 24)}_secret_${Math.random().toString(36).substr(2, 24)}`,
      description: description || "Self-ServiceDigital Order",
      created: new Date(),
    };

    return NextResponse.json(mockPaymentIntent);
  } catch {
    return NextResponse.json(
      { error: "Erro ao criar intenção de pagamento" },
      { status: 500 }
    );
  }
}
