"use client";

import { useState } from "react";
import useAuthStore from "@/app/_features/auth/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser, setToken } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao fazer login");
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
      setError(err instanceof Error ? err.message : "Erro inesperado ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-24 text-white">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-black/30 p-8 shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl">
        <h1 className="mb-2 text-center text-3xl font-semibold">Bem-vindo!</h1>
        <p className="mb-8 text-center text-white/65">
          Faça login em sua conta para continuar
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-violet-300/60 focus:ring-2 focus:ring-violet-400/20"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-white/65">
            Não tem conta?{" "}
            <Link href="/signup" className="font-medium text-violet-300 transition hover:text-violet-200">
              Registre-se
            </Link>
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-cyan-300/30 bg-cyan-500/10 p-3 text-sm text-cyan-100/90">
          <p className="font-semibold mb-1">Teste com:</p>
          <p>Email: admin@example.com</p>
          <p>Senha: admin123</p>
        </div>
      </div>
    </div>
  );
}
