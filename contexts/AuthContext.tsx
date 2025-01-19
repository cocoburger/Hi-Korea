// contexts/AuthContext.tsx
import React, { createContext, useState, useContext } from 'react';
import { handleOAuthLogin, OAuthCredential } from "@/types/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loginWithOAuth: (credential: OAuthCredential) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);


  const login = async (email: string, password: string) => {
    // 실제 구현에서는 서버 API를 호출하여 인증을 처리합니다
    // 여기서는 간단한 예시로 이메일과 비밀번호가 있는지만 확인합니다
    if (email && password) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const loginWithOAuth = async (credential: OAuthCredential) => {
    try {
      // 각 제공자별 특별한 처리가 필요한 경우 여기서 처리
      const result = await handleOAuthLogin(credential);

      if (result.success) {
        setIsAuthenticated(true);
        setUserInfo(result.userInfo);
        return true;
      }
      return false;
    } catch (error) {
      console.error(`OAuth login failed for provider ${credential.provider}:`, error);
      return false;
    }
  };



  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout,loginWithOAuth }}>
        {children}
      </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


