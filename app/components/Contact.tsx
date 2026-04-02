"use client";

import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message =
      `Olá, vim pelo site e quero entrar em contato.\n\n` +
      `Nome: ${name.trim()}\n` +
      `WhatsApp: ${phone.trim()}`;

    window.open(
      `https://api.whatsapp.com/send?phone=5524998344324&text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <section id="contato" className="catalog-question contact-panel" aria-labelledby="contact-title">
      <div className="catalog-question__header">
        <span className="catalog-question__step">Contato</span>
        <h2 id="contact-title" className="catalog-question__title">
          Fale com a Self-ServiceDigital
        </h2>
        <p className="catalog-question__subtitle">
          Informe seu nome e seu número de WhatsApp para continuar direto no atendimento.
        </p>
      </div>

      <form className="contact-panel__form" onSubmit={handleSubmit}>
        <label className="quote-modal__field" htmlFor="contact-name">
          <span className="quote-modal__label">Nome</span>
          <input
            id="contact-name"
            className="quote-modal__control"
            type="text"
            placeholder="Ex: João Silva"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>

        <label className="quote-modal__field" htmlFor="contact-phone">
          <span className="quote-modal__label">Número de WhatsApp</span>
          <input
            id="contact-phone"
            className="quote-modal__control"
            type="tel"
            placeholder="Ex: (24) 99834-4324"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </label>

        <div className="contact-panel__actions">
          <button type="submit" className="catalog-question__next contact-panel__submit">
            Falar no WhatsApp
          </button>
        </div>
      </form>
    </section>
  );
}
