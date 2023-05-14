'use client'
import { useAuthContext } from "@/context/useAuthContext";
import { auth } from "@/services/loginUser";
import { onAuthStateChanged } from "firebase/auth";
import {useState,useEffect} from 'react'


export function useVerificarUsuario(){
    const { user, setUser } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const verifyExistUser = Object.keys(user).length == 0;
  
    useEffect(() => {
      handlePersistScreenIfAuth();
    }, []);
  
    function handlePersistScreenIfAuth() {
      if (!verifyExistUser) {
        setLoading(false);
        return;
      }
      onAuthStateChanged(auth, (user: any) => {
        if (user) {
          setUser(user);
        }
        setLoading(false);
      });
    }

    return {loading,user,verifyExistUser,setUser}

}