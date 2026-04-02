import { NextRequest, NextResponse } from "next/server";

// Simulação de webhooks de pagamento
export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId, status } = await request.json();

    if (!paymentIntentId || !status) {
      return NextResponse.json(
        { error: "Dados obrigatórios faltando" },
        { status: 400 }
      );
    }

    // Aqui você processaria o webhook real do Stripe
    // Por enquanto, apenas simulamos a confirmação

    return NextResponse.json({
      success: true,
      paymentIntentId,
      status,
      message: "Webhook processado com sucesso",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao processar webhook" },
      { status: 500 }
    );
  }
}
