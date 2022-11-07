/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { createContext, useState } from 'react';

export const TOKEN_KEY = '@z-Token';
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

interface AuthContextData {
  signed: boolean;
  login(token: string): void;
  logout(): void;
 }
 

 const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type Props = {
  children: JSX.Element;
}

export const AuthProvider = ({ children }: Props) => {
 const [user, setUser] = useState<boolean | null>(null);

const login = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  setUser(true);
};

const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  setUser(false);
};

 return (
   <AuthContext.Provider value={ {signed: Boolean(user), login, logout}}>
     {children}
   </AuthContext.Provider>
 );
};

export default AuthContext;

