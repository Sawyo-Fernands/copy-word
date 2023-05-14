'use client'
import { collection, getDocs, query, where } from "firebase/firestore";
import { useVerificarUsuario } from "./useVerifyUser";
import { db } from "@/services/initializeDataBase";
import {useState,useEffect} from  'react'
type Model ={
    id:string;
    modelo:string;
    email:string,
    nome:string
}

export function useGetDataModels(){
    
    const { user } = useVerificarUsuario()

    const [listaModelos,setListaModelos] = useState<Model[]>([])

        async function returnDataModels(){
            const queryModelos = query(collection(db, "modelos"), where("id", "==", user.uid));
            const data = await getDocs(queryModelos)
            const result : any= data.docs.map(doc => doc.data())
            if(Array.isArray(result)){
                setListaModelos(result)
            }
        }

        useEffect(()=>{
            const executarRequest = async ()=>{
                await returnDataModels()
            }
            if(user.uid)  executarRequest()
        },[user])
        
        return { listaModelos,setListaModelos }
}