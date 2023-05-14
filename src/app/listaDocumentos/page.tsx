"use client"

import { TelaNoAuth } from "@/Components/TelaNoAuth"
import { useAuthContext } from "@/context/useAuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ListaDocumentos(){

    const { user } = useAuthContext()
    const verifyExistUser = Object.keys(user).length == 0

    if(verifyExistUser){
        return <TelaNoAuth />
    }

    return (
        <h1>Lista Documentos</h1>
    )
}