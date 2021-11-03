import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'
import User from "@data/core/identity/User";
import { UserSignIn } from "@data/core/identity/UserSignIn";
import useApp from "@data/hooks/UseApp";
import { getUserInformation, registerUser, signInUser } from "@data/services/userServices";
import { api } from "@data/services/api";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: UserSignIn) => Promise<any>
  signOut: () => Promise<void>
  register: (User) => Promise<any>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const { shop } = useApp()

  const [user, setUser] = useState<User | null>(null)

  const roleRequired = 3
  const isAuthenticated = !!user;

  async function signIn({ userName, password, remember }: UserSignIn) {
    try {
      const { token, userData } = await signInUser({ userName, password }).then(response => {
        return response
      })

      if (userData.userRoles[0].role.id == roleRequired) {
        const maxAge = remember ? 3600 * 24 * 7 : 3600 * 24 * 1
        setCookie(undefined, 'client.auth.token', token, { maxAge })
        await configureSession(token)
        return true;
      }
      return false;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  async function register(data: User) {
    try {
      const { token } = await registerUser(data).then(response => {
        return response
      })
      setCookie(undefined, 'client.auth.token', token, {
        maxAge: 3600 * 24 * 1
      })
      await configureSession(token)
      if (token) {
        return true;
      }
      return false;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  async function signOut() {
    setUser(null)
    destroyCookie(null, 'client.auth.token')
    Router.push(shop.url);
  }

  async function configureSession(token: string) {
    try {
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      await getUserInformation().then(response => {
        setUser(response?.userData)
      })
    }
    catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    async function loadSession() {
      const { 'client.auth.token': token } = parseCookies()
      if (token) {
        configureSession(token)
      } else {
        setUser(null)
        destroyCookie(null, 'client.auth.token')
      }
    }
    loadSession()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, register }}>
      {children}
    </AuthContext.Provider>
  )
}