"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type QuoteOptionId } from "@/app/_features/quote/lib/quoteFormSchema";

export type QuoteAnswers = Record<string, string>;

interface QuoteDraft {
  type: QuoteOptionId | null;
  selectedFeatures: string[];
  answers: QuoteAnswers;
  secondQuestionAnswer: string | null;
}

interface QuoteFormStore {
  draft: QuoteDraft;
  setDraft: (type: QuoteOptionId, answers: QuoteAnswers) => void;
  setSelectedFeatures: (features: string[]) => void;
  updateAnswers: (answers: QuoteAnswers) => void;
  setSecondQuestionAnswer: (answer: string) => void;
  clearDraft: () => void;
}

const useQuoteFormStore = create<QuoteFormStore>()(
  persist(
    (set) => ({
      draft: {
        type: null,
        selectedFeatures: [],
        answers: {},
        secondQuestionAnswer: null,
      },
      setDraft: (type, answers) =>
        set({
          draft: {
            type,
            selectedFeatures: [],
            answers,
            secondQuestionAnswer: null,
          },
        }),
      setSelectedFeatures: (features) =>
        set((state) => ({
          draft: {
            ...state.draft,
            selectedFeatures: features,
          },
        })),
      updateAnswers: (answers) =>
        set((state) => ({
          draft: {
            ...state.draft,
            answers,
          },
        })),
      setSecondQuestionAnswer: (answer) =>
        set((state) => ({
          draft: {
            ...state.draft,
            secondQuestionAnswer: answer,
          },
        })),
      clearDraft: () =>
        set({
          draft: {
            type: null,
            selectedFeatures: [],
            answers: {},
            secondQuestionAnswer: null,
          },
        }),
    }),
    {
      name: "quote-form-store",
    },
  ),
);

export default useQuoteFormStore;
