"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/app/types";

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    phone?: string
  ) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  isAuthenticated: () => boolean;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Login failed");
          }

          const data = await response.json();
          set({ user: data.user, token: data.token });
        } catch (error) {
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (
        name: string,
        email: string,
        password: string,
        phone?: string
      ) => {
        set({ isLoading: true });
        try {
          const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, phone }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Registration failed");
          }

          const data = await response.json();
          set({ user: data.user, token: data.token });
        } catch (error) {
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({ user: null, token: null });
      },

      setUser: (user: User | null) => {
        set({ user });
      },

      setToken: (token: string | null) => {
        set({ token });
      },

      isAuthenticated: () => {
        return get().user !== null && get().token !== null;
      },
    }),
    {
      name: "auth-store",
    }
  )
);

export default useAuthStore;
