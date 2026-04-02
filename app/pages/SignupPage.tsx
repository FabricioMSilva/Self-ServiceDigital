"use client";

import { useState } from "react";
import useAuthStore from "@/app/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser, setToken } = useAuthStore();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validações
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não conferem");
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao registrar");
      }

      const data = await response.json();
      setUser(data.user);
      setToken(data.token);

      // Salvar no localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("auth-store", JSON.stringify({
          state: {
            user: data.user,
            token: data.token,
            isLoading: false,
          },
        }));
      }

      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040b1f] text-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-cyan-500/30 p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Criar Conta</h1>
        <p className="text-center text-slate-400 mb-8">
          Registre-se para começar a usar nossos serviços
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu Nome"
              className="w-full px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 focus:border-cyan-400 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              className="w-full px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 focus:border-cyan-400 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Telefone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(24) 99834-4324"
              className="w-full px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 focus:border-cyan-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Senha</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 focus:border-cyan-400 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Confirmar Senha
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 focus:border-cyan-400 outline-none transition"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 rounded-lg font-semibold transition"
          >
            {loading ? "Criando Conta..." : "Registrar"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-slate-400">
            Já tem conta?{" "}
            <Link href="/login" className="text-cyan-400 hover:text-cyan-300">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
