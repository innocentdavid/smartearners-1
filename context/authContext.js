import { createContext } from 'react'

const AuthContext = createContext({
  user: null,
  authReady: false
})

export const AuthContextProvider = () => {

  return(
    <AuthContext.Provider></AuthContext.Provider>
  )
}