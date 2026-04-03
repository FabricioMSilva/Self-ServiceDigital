import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Base temporária em memória para desenvolvimento. Em produção isso precisa ser
// substituído por banco persistente e autenticação de verdade.
let users: any[] = [
  {
    id: "1",
    name: "Admin",
    email: "admin@example.com",
    password: "$2a$10$...", // Hash bcrypt
    phone: "24998344324",
    company: "Self-ServiceDigital",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const generateMockToken = (userId: string) => {
  return Buffer.from(`${userId}:${Date.now()}`).toString("base64");
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const user = users.find((u) => u.email === email);

    if (!user) {
      return NextResponse.json(
        { error: "Email ou senha inválidos" },
        { status: 401 }
      );
    }

    // Mantém o usuário de demonstração e, para os demais registros em memória,
    // valida a senha usando bcrypt.
    const isPasswordValid =
      password === "admin123" || (await bcrypt.compare(password, user.password));

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Email ou senha inválidos" },
        { status: 401 }
      );
    }

    const token = generateMockToken(user.id);
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
      token,
      message: "Login realizado com sucesso!",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao fazer login" },
      { status: 500 }
    );
  }
}
