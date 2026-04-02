"use client";

import { useState } from "react";
import useAuthStore from "@/app/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, setUser, setToken } = useAuthStore();
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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040b1f] text-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-cyan-500/30 p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Bem-vindo!</h1>
        <p className="text-center text-slate-400 mb-8">
          Faça login em sua conta para continuar
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 focus:border-cyan-400 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-slate-400">
            Não tem conta?{" "}
            <Link href="/signup" className="text-cyan-400 hover:text-cyan-300">
              Registre-se
            </Link>
          </p>
        </div>

        <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-300">
          <p className="font-semibold mb-1">Teste com:</p>
          <p>Email: admin@example.com</p>
          <p>Senha: admin123</p>
        </div>
      </div>
    </div>
  );
}
