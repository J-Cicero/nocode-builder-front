import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const MOCK_USER = {
  id: "abc-123",
  name: "Jude Cicero",
  email: "jude@example.com",
  role: "user",
  plan: "free"
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email === "demo@buildrafrica.com" && password === "Demo1234!") {
        setUser(MOCK_USER);
        return MOCK_USER;
      } else {
        throw new Error("Invalid credentials");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const newUser = {
        ...MOCK_USER,
        id: `${Date.now()}`,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        plan: data.plan || "free"
      };
      
      setUser(newUser);
      return newUser;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
