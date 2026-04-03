"use client";

import { useState } from "react";
import useAuthStore from "@/app/_features/auth/stores/authStore";
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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro inesperado ao registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-24 text-white">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-black/30 p-8 shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl">
        <h1 className="mb-2 text-center text-3xl font-semibold">Criar Conta</h1>
        <p className="mb-8 text-center text-white/65">
          Registre-se para começar a usar nossos serviços
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu Nome"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-violet-300/60 focus:ring-2 focus:ring-violet-400/20"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-violet-300/60 focus:ring-2 focus:ring-violet-400/20"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">Telefone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(24) 99834-4324"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-violet-300/60 focus:ring-2 focus:ring-violet-400/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">Senha</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-violet-300/60 focus:ring-2 focus:ring-violet-400/20"
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
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-violet-300/60 focus:ring-2 focus:ring-violet-400/20"
              required
            />
          </div>

          {error && (
            <div className="rounded-xl border border-rose-300/35 bg-rose-500/10 p-3 text-sm text-rose-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Criando Conta..." : "Registrar"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-white/65">
            Já tem conta?{" "}
            <Link href="/login" className="font-medium text-violet-300 transition hover:text-violet-200">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
