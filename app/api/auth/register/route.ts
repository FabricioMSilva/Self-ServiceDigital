import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Simulação de banco de dados em memória
let users: any[] = [
  {
    id: "1",
    name: "Admin",
    email: "admin@example.com",
    password: "$2a$10$...",
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
    const { name, email, password, phone } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nome, email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: "Este email já está registrado" },
        { status: 409 }
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      password: hashedPassword,
      phone: phone || "",
      company: "",
      role: "customer",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(newUser);

    const token = generateMockToken(newUser.id);
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      {
        user: userWithoutPassword,
        token,
        message: "Registro realizado com sucesso!",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao registrar usuário" },
      { status: 500 }
    );
  }
}
