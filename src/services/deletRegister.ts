import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./initializeDataBase";


export async function excluirRegistro(idSelecionado:string){

    const result = await deleteDoc(doc(db, "id", idSelecionado));
    return result
}

