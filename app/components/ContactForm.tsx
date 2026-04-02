"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao enviar mensagem");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Limpar mensagem de sucesso após 5s
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-cyan-100">
            Nome Completo *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Seu Nome"
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-500 bg-slate-900/50 text-white outline-none focus:border-cyan-400 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-cyan-100">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-500 bg-slate-900/50 text-white outline-none focus:border-cyan-400 transition"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-cyan-100">
            Telefone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(24) 99834-4324"
            className="w-full px-4 py-2 rounded-lg border border-slate-500 bg-slate-900/50 text-white outline-none focus:border-cyan-400 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-cyan-100">
            Assunto *
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-500 bg-slate-900/50 text-white outline-none focus:border-cyan-400 transition"
          >
            <option value="">Selecione um assunto</option>
            <option value="Orçamento">Solicitar Orçamento</option>
            <option value="Dúvida">Dúvida sobre Serviços</option>
            <option value="Suporte">Suporte Técnico</option>
            <option value="Feedback">Feedback/Sugestão</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-cyan-100">
          Mensagem *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Digite sua mensagem aqui..."
          rows={5}
          required
          className="w-full px-4 py-2 rounded-lg border border-slate-500 bg-slate-900/50 text-white outline-none focus:border-cyan-400 transition resize-none"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-300 text-sm">
          ❌ {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-300 text-sm">
          ✅ Mensagem enviada com sucesso! Responderemos em breve.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 rounded-lg font-bold transition text-white"
      >
        {loading ? "Enviando..." : "Enviar Mensagem"}
      </button>
    </form>
  );
}
