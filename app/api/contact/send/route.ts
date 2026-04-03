import { NextRequest, NextResponse } from "next/server";

// Mock de mensagens em memória para permitir testes do formulário e do admin.
let messages: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message: msgText } = await request.json();

    if (!name || !email || !subject || !msgText) {
      return NextResponse.json(
        { error: "Todos os campos obrigatórios devem ser preenchidos" },
        { status: 400 }
      );
    }

    // Validação de email simples
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    const contact = {
      id: `msg_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      phone: phone || "",
      subject,
      message: msgText,
      status: "new",
      createdAt: new Date(),
    };

    messages.push(contact);

    // TODO: Implementar envio real de email com nodemailer
    // Aqui você integraria com o seu serviço de email
    console.log("📧 Nova mensagem de contato:", contact);

    // Mantido como mock até existir integração real de email.
    const emailSent = true; // Em produção, usar nodemailer

    return NextResponse.json(
      {
        success: true,
        id: contact.id,
        message: "Mensagem recebida com sucesso! Responderemos em breve.",
        emailSent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao processar contato:", error);
    return NextResponse.json(
      { error: "Erro ao processar sua mensagem" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // TODO: Adicionar autenticação antes de retornar mensagens
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar mensagens" },
      { status: 500 }
    );
  }
}
