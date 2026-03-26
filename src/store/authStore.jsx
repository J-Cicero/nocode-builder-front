import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// Mock data required by design brief
const MOCK_USER = {
  id: "abc123",
  name: "Jean Dupont",
  email: "jean@example.com",
  plan: "free",
  role: "user"
};
const MOCK_PASSWORD = "Demo1234!";
const TOKEN_KEY = "access_token";
const USER_KEY = "authUser";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore auth from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_KEY);
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Erreur parsing stored user:", error);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (email === MOCK_USER.email && password === MOCK_PASSWORD) {
        const sessionToken = "mock-token-123";
        setUser(MOCK_USER);
        setToken(sessionToken);
        localStorage.setItem(USER_KEY, JSON.stringify(MOCK_USER));
        localStorage.setItem(TOKEN_KEY, sessionToken);
        return { user: MOCK_USER, token: sessionToken };
      }
      throw new Error("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newUser = {
        ...MOCK_USER,
        id: `${Date.now()}`,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email || MOCK_USER.email,
        plan: data.plan || "free"
      };
      const sessionToken = "mock-token-123";
      setUser(newUser);
      setToken(sessionToken);
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
      localStorage.setItem(TOKEN_KEY, sessionToken);
      return { user: newUser, token: sessionToken };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    register,
    logout
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
