import { useState, createContext, useEffect } from "react"
import { me } from "../data/fetch.js"


export const AuthorContext = createContext()

export default function AuthorContextProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [authorInfo, setAuthorInfo] = useState()
    const getMe = async () =>{
      const meInfo = await me();
      setAuthorInfo(meInfo)
    }
    useEffect(()=>{
        if (token) getMe() //la me vuole come auth il token, quindi senza il token si rompe il backend
    },[token])
    const value = {token, setToken, authorInfo}
    return (
        <AuthorContext.Provider value={value}>{children}</AuthorContext.Provider>
    )
}