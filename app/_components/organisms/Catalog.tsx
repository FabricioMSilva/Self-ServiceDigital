"use client";

import { useState } from "react";
import {
  getDetailFields,
  getFeaturesQuestion,
  getQuoteFieldLabel,
  quoteFormSchema,
  type QuoteField,
  type QuoteOptionId,
} from "@/app/_features/quote/lib/quoteFormSchema";
import { buildQuoteEstimate } from "@/app/_features/quote/lib/quotePricing";
import useQuoteFormStore from "@/app/_features/quote/stores/quoteFormStore";

const developmentOptions = [
  {
    id: "Aplicação Android",
    icon: "📱",
    description: "App nativo ou híbrido para Android",
  },
  {
    id: "Site Web",
    icon: "🌐",
    description: "Landing page, site institucional ou portal",
  },
  {
    id: "Sistema (Programa)",
    icon: "🖥️",
    description: "Sistema interno, painel ou software sob medida",
  },
  {
    id: "Site e App",
    icon: "🚀",
    description: "Projeto combinado com presença web e mobile",
  },
  {
    id: "Robo Venda Whatsapp",
    icon: "💬",
    description: "Automacao comercial e atendimento no WhatsApp",
  },
  {
    id: "Robo Venda Telegram",
    icon: "🤖",
    description: "Automacao e funis com bot no Telegram",
  },
  {
    id: "Aplicação Power Platform",
    icon: "⚙️",
    description: "Fluxos, apps e automacoes com Power Platform",
  },
  {
    id: "SaaS / Plataforma",
    icon: "☁️",
    description: "Plataforma com assinatura, onboarding e operacao recorrente",
  },
  {
    id: "White Label",
    icon: "🎯",
    description: "Site base reutilizavel para nichos com personalizacao rapida",
  },
] as const satisfies ReadonlyArray<{
  id: QuoteOptionId;
  icon: string;
  description: string;
}>;

type FormAnswers = Record<string, string>;

function renderField(
  field: QuoteField,
  value: string,
  onChange: (fieldId: string, nextValue: string) => void,
) {
  if (field.type === "textarea") {
    return (
      <textarea
        id={field.id}
        className="quote-modal__control quote-modal__control--textarea"
        placeholder={field.placeholder}
        value={value}
        onChange={(event) => onChange(field.id, event.target.value)}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        id={field.id}
        className="quote-modal__control"
        value={value}
        onChange={(event) => onChange(field.id, event.target.value)}
      >
        <option value="">Selecione uma opcao</option>
        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      id={field.id}
      className="quote-modal__control"
      type={field.type}
      placeholder={field.placeholder}
      value={value}
      onChange={(event) => onChange(field.id, event.target.value)}
    />
  );
}

export default function Catalog() {
  const [isQuotePreviewOpen, setIsQuotePreviewOpen] = useState(false);
  const [formAnswers, setFormAnswers] = useState<FormAnswers>({});
  const [isDetailsStepOpen, setIsDetailsStepOpen] = useState(false);
  const {
    draft,
    setDraft,
    setSelectedFeatures,
    updateAnswers,
    setSecondQuestionAnswer,
    clearDraft,
  } = useQuoteFormStore();

  const selectedDevelopmentType = draft.type;
  const selectedFeatures = draft.selectedFeatures ?? [];

  const featuresQuestion = selectedDevelopmentType
    ? getFeaturesQuestion(selectedDevelopmentType)
    : null;
  const detailFields = selectedDevelopmentType
    ? getDetailFields(selectedDevelopmentType, selectedFeatures)
    : [];
  const estimate =
    selectedDevelopmentType
      ? buildQuoteEstimate(selectedDevelopmentType, draft.answers, draft.secondQuestionAnswer)
      : null;

  const handleOptionClick = (optionId: QuoteOptionId) => {
    setDraft(optionId, {});
    setFormAnswers({});
    setIsDetailsStepOpen(false);
  };

  const handleFieldChange = (fieldId: string, nextValue: string) => {
    setFormAnswers((current) => ({
      ...current,
      [fieldId]: nextValue,
    }));
  };

  const handleContinue = () => {
    if (!selectedDevelopmentType) {
      return;
    }

    updateAnswers(formAnswers);
    setIsQuotePreviewOpen(true);
  };

  const handleBackToFormModal = () => {
    setIsQuotePreviewOpen(false);
    setIsDetailsStepOpen(true);
  };

  const toggleFeature = (featureId: string) => {
    const exists = selectedFeatures.includes(featureId);
    const nextFeatures = exists
      ? selectedFeatures.filter((item) => item !== featureId)
      : [...selectedFeatures, featureId];

    setSelectedFeatures(nextFeatures);
  };

  const handleOpenDetailsStep = () => {
    if (!selectedDevelopmentType || selectedFeatures.length === 0) {
      return;
    }

    setSecondQuestionAnswer(selectedFeatures.join(", "));
    setFormAnswers(draft.answers);
    setIsDetailsStepOpen(true);
  };

  const handleBackToFirstQuestion = () => {
    setIsQuotePreviewOpen(false);
    setIsDetailsStepOpen(false);
    setFormAnswers({});
    clearDraft();
  };

  const handleBackToSecondQuestion = () => {
    setIsDetailsStepOpen(false);
    setIsQuotePreviewOpen(false);
  };

  const sendToWhatsApp = () => {
    if (!selectedDevelopmentType || !estimate) {
      return;
    }

    const answersText = Object.entries(draft.answers)
      .filter(([, value]) => value.trim() !== "")
      .map(
        ([fieldId, value]) =>
          `- ${getQuoteFieldLabel(selectedDevelopmentType, fieldId)}: ${value}`,
      )
      .join("\n");

    const itemsText = estimate.items
      .map((item) => `- ${item.label}: R$ ${item.amount.toLocaleString("pt-BR")}`)
      .join("\n");

    const message =
      `Olá, eu quero seguir com este orçamento.\n\n` +
      `Tipo selecionado: ${selectedDevelopmentType}\n` +
      `Prioridade da fase 1: ${draft.secondQuestionAnswer}\n\n` +
      `Respostas do formulário:\n${answersText}\n\n` +
      `Pré-orçamento:\n${itemsText}\n` +
      `Total estimado: R$ ${estimate.total.toLocaleString("pt-BR")}`;

    window.open(
      `https://api.whatsapp.com/send?phone=5524998344324&text=${encodeURIComponent(message)}`,
      "_blank",
    );

    setIsQuotePreviewOpen(false);
    clearDraft();
    setFormAnswers({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {!selectedDevelopmentType && !isDetailsStepOpen && !isQuotePreviewOpen ? (
        <section className="catalog-question" aria-labelledby="catalog-question-title">
          <div className="catalog-question__header">
            <span className="catalog-question__step">Pergunta 1</span>
            <h2 id="catalog-question-title" className="catalog-question__title">
              {quoteFormSchema.initialQuestion}
            </h2>
          </div>

          <div
            className="catalog-question__options"
            role="group"
            aria-label="Tipos de desenvolvimento"
          >
            {developmentOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className="catalog-question__option"
                onClick={() => handleOptionClick(option.id)}
              >
                <span className="catalog-question__option-icon" aria-hidden="true">
                  {option.icon}
                </span>
                <span className="catalog-question__option-title">{option.id}</span>
                <span className="catalog-question__option-description">
                  {option.description}
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {selectedDevelopmentType && featuresQuestion && !isDetailsStepOpen && !isQuotePreviewOpen ? (
        <section className="catalog-question" aria-labelledby="catalog-followup-title">
          <div className="catalog-question__nav catalog-question__nav--top">
            <button
              type="button"
              className="catalog-question__back"
              onClick={handleBackToFirstQuestion}
              aria-label="Voltar para a pergunta 1"
              title="Voltar para a pergunta 1"
            >
              Voltar
            </button>
            <button
              type="button"
              className="catalog-question__next"
              onClick={handleOpenDetailsStep}
              disabled={selectedFeatures.length === 0}
              aria-label="Ir para a pergunta 3"
              title="Ir para a pergunta 3"
            >
              Avançar
            </button>
          </div>

          <div className="catalog-question__header">
            <span className="catalog-question__step">Pergunta 2</span>
            <h2 id="catalog-followup-title" className="catalog-question__title">
              {featuresQuestion.title}
            </h2>
            <p className="catalog-question__subtitle">{featuresQuestion.description}</p>
          </div>

          <div className="catalog-question__selected-type">
            <span className="catalog-question__selected-label">Tipo selecionado</span>
            <strong className="catalog-question__selected-value">{selectedDevelopmentType}</strong>
          </div>

          <div className="catalog-question__options" role="group" aria-label="Itens desejados no projeto">
            {featuresQuestion.options.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`catalog-question__option catalog-question__option--compact${selectedFeatures.includes(option.id) ? " is-selected" : ""
                  }`}
                onClick={() => toggleFeature(option.id)}
              >
                <span className="catalog-question__feature-icon" aria-hidden="true">
                  {option.icon}
                </span>
                <span className="catalog-question__option-title">{option.label}</span>
                <span className="catalog-question__option-description">{option.description}</span>
              </button>
            ))}
          </div>

          {Object.keys(draft.answers).length > 0 ? (
            <div className="catalog-question__summary" aria-live="polite">
              <span className="catalog-question__summary-badge">Rascunho Atual</span>
              <h3 className="catalog-question__summary-title">
                {quoteFormSchema.forms[selectedDevelopmentType].title}
              </h3>
              <p className="catalog-question__summary-type">{selectedDevelopmentType}</p>
              <div className="catalog-question__summary-list">
                {Object.entries(draft.answers)
                  .filter(([, value]) => value.trim() !== "")
                  .map(([fieldId, value]) => (
                    <div key={fieldId} className="catalog-question__summary-item">
                      <span className="catalog-question__summary-key">
                        {getQuoteFieldLabel(selectedDevelopmentType, fieldId)}
                      </span>
                      <span className="catalog-question__summary-value">{value}</span>
                    </div>
                  ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      {selectedDevelopmentType && isDetailsStepOpen && !isQuotePreviewOpen ? (
        <section className="catalog-question" aria-labelledby="catalog-details-title">
          <div className="catalog-question__nav catalog-question__nav--top">
            <button
              type="button"
              className="catalog-question__back"
              onClick={handleBackToSecondQuestion}
              aria-label="Voltar para a pergunta 2"
              title="Voltar para a pergunta 2"
            >
              Voltar
            </button>
            <button
              type="submit"
              form="catalog-details-form"
              className="catalog-question__next"
              aria-label="Pedir orçamento"
              title="Pedir orçamento"
            >
              Pedir orçamento
            </button>
          </div>

          <div className="catalog-question__header">
            <span className="catalog-question__step">Pergunta 3</span>
            <h2 id="catalog-details-title" className="catalog-question__title">
              Vamos detalhar o que você selecionou
            </h2>
            <p className="catalog-question__subtitle">
              Preencha agora os detalhes das funcionalidades escolhidas para gerar seu orçamento.
            </p>
          </div>

          <form
            id="catalog-details-form"
            className="quote-inline-form"
            onSubmit={(event) => {
              event.preventDefault();
              handleContinue();
            }}
          >
            {detailFields.map((field) => (
              <label key={field.id} className="quote-modal__field" htmlFor={field.id}>
                <span className="quote-modal__label">{field.label}</span>
                {renderField(field, formAnswers[field.id] ?? "", handleFieldChange)}
              </label>
            ))}
          </form>
        </section>
      ) : null}

      {isQuotePreviewOpen && estimate ? (
        <div
          className="quote-slip-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-slip-title"
        >
          <div className="quote-slip-modal__backdrop" onClick={() => setIsQuotePreviewOpen(false)} />
          <div className="quote-slip">
            <div className="quote-slip__header">
              <span className="quote-slip__eyebrow">Pré-Orçamento</span>
              <h3 id="quote-slip-title" className="quote-slip__title">
                {estimate.title}
              </h3>
              <p className="quote-slip__type">{selectedDevelopmentType}</p>
            </div>

            <div className="quote-slip__barcode" aria-hidden="true">
              <span />
            </div>

            <div className="quote-slip__items">
              {estimate.items.map((item) => (
                <div key={item.label} className="quote-slip__item">
                  <span className="quote-slip__item-label">{item.label}</span>
                  <strong className="quote-slip__item-value">
                    R$ {item.amount.toLocaleString("pt-BR")}
                  </strong>
                </div>
              ))}
            </div>

            <div className="quote-slip__total">
              <span>Total estimado</span>
              <strong>R$ {estimate.total.toLocaleString("pt-BR")}</strong>
            </div>

            <p className="quote-slip__note">{estimate.marketReference}</p>

            <div className="quote-slip__actions">
              <button
                type="button"
                className="quote-slip__secondary"
                onClick={handleBackToFormModal}
              >
                Voltar para formulário
              </button>
              <button type="button" className="quote-slip__primary" onClick={sendToWhatsApp}>
                Eu quero assim
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
