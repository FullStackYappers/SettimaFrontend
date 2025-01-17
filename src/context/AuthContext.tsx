import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  profile_picture?: string;
  about?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("auth_token");

      console.log("Initializing Auth");
      console.log("Stored user:", storedUser);
      console.log("Stored token:", storedToken);

      if (storedUser && storedToken) {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log("Parsed user:", parsedUser);
          setUser(parsedUser);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error parsing stored user data:", error);
          localStorage.removeItem("user");
          localStorage.removeItem("auth_token");
        }
      } else {
        console.log("No stored user or token found");
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData: User, token: string) => {
    console.log("Login function called");
    console.log("User data:", userData);
    console.log("Token:", token);
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("auth_token", token);
  };

  const logout = () => {
    console.log("Logout function called");
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("auth_token");
  };

  console.log("AuthContext state:", { user, isLoading, isLoggedIn });

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isLoggedIn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
