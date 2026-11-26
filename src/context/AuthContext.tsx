"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/** Data that AuthContext gives to every page */
type AuthContextType = {
  user: string | null;
  isLoading: boolean;
  login: (email: string) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Gives login data to all pages
 * The effect reads the saved user from localStorage once when the app opens
 */

export const AuthProvider = ({ children }: AuthProviderProps) => {
 
  const [user, setUser] = useState<string | null>(null);

  /** True until localStorage is checked so ProtectedRoute waits before redirecting */
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(localStorage.getItem("user"));
    setIsLoading(false);
  }, []);

  const login = (email: string) => {
    setUser(email);
    localStorage.setItem("user", email);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};