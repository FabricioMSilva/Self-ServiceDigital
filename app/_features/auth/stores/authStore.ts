"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/app/_types";

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,

      logout: () => {
        set({ user: null, token: null });
      },

      setUser: (user: User | null) => {
        set({ user });
      },

      setToken: (token: string | null) => {
        set({ token });
      },
    }),
    {
      name: "auth-store",
    }
  )
);

export default useAuthStore;
