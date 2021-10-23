import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'
import User from "@data/core/identity/User";
import { UserSignIn } from "@data/core/identity/UserSignIn";
import useApp from "@data/hooks/UseApp";
import { getUserInformation, registerUser, signInUser } from "@data/services/userServices";
import { api } from "@data/services/api";
import ShoppingSession from "@data/core/ShoppingSession";
import { AddShoppingSession, GetShoppingSessionById } from "@data/services/shoppingSessionServices";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: UserSignIn) => Promise<any>
  signOut: () => Promise<void>
  register: (User) => Promise<any>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const { setIsLoading, shop } = useApp()

  const [user, setUser] = useState<User | null>(null)

  const roleRequired = 3
  const isAuthenticated = !!user;

  async function signIn({ userName, password }: UserSignIn) {
    try {
      setIsLoading(true)

      const { token, userData } = await signInUser({ userName, password }).then(response => {
        return response
      })

      if (userData.userRoles[0].role.id == roleRequired) {
        setCookie(undefined, 'client.auth.token', token, {
          maxAge: 3600 * 24 * 7 // 7 days
        })
        configureSession(token)
        Router.push(shop.url);
      }

      return {
        authorized: false,
        message: "Não autorizado"
      }
    }
    catch (error) {
      return {
        authorized: false,
        message: "Houve um erro ao realizar o login"
      }
    }
    finally {
      setIsLoading(false)
    }
  }

  async function register(data: User) {
    try {
      setIsLoading(true)

      const { token } = await registerUser(data).then(response => {
        return response
      })
      setCookie(undefined, 'client.auth.token', token, {
        maxAge: 3600 * 24 * 7 // 7 days
      })
      configureSession(token)
      Router.push(shop.url);
    }
    catch (error) {
      return {
        message: "Houve um erro ao realizar o login"
      }
    }
    finally {
      setIsLoading(false)
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
      }
      setUser(null)
      destroyCookie(null, 'client.auth.token')
      console.log("carregou a sessão")
    }
    loadSession()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, register }}>
      {children}
    </AuthContext.Provider>
  )
}