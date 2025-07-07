import React, { createContext, useState, type ReactNode } from 'react'
import * as apiService from "../services/apiService";

const AuthContext = createContext(null);

type AuthProviderProps = {
    children : ReactNode
}

export const AuthProvider = ({children}: AuthProviderProps) => {

const [accessToken,setAccessToken] = useState<string | null>(null);

// const login = async (email:string,password:string) => {
//     const res: string | void = await apiService.login(email,password);
//     setAccessToken(res);
// }

  return (
    <div>AuthProvider</div>
  )
}

