"use client"
import { ReactNode, createContext, useContext, useState } from "react";

interface IGlobalContextprops{
    user: any;
  loading: boolean;
  setUser: (user: any) => void;
  setLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<IGlobalContextprops>({
    user: {},
    loading: true,
    setUser: () => {},
    setLoading: () => {},
  });
  

  interface GlobalContextProviderProps{
    children:ReactNode
  }

  export const GlobalContextProvider = ({children}:GlobalContextProviderProps) => {
    const [currentUser, setCurrentUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
  
    return (
      <AuthContext.Provider
        value={{
          user: currentUser,
          loading: isLoading,
          setUser: setCurrentUser,
          setLoading: setIsLoading,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }; 

  export const useAuthContext = () => useContext(AuthContext);
