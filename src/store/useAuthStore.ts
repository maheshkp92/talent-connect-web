import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the structure of your User data
interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

// Define the Store properties and actions
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      // Call this action immediately after a successful API login or signup
      login: (userData) =>
        set({
          user: userData,
          isAuthenticated: true,
        }),

      // Clear the session completely on logout
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage", // Key name for the item in localStorage
      storage: createJSONStorage(() => localStorage), // Defaults to localStorage
    },
  ),
);
