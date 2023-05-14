import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase";

export const auth = getAuth(app);

export async function logarUsuario(email:string,senha:string){

    try {
        return await signInWithEmailAndPassword(auth, email, senha).then((response)=>{
            return response
        }).catch((error:any)=>{
            return error.code
        })
      } catch (error :any) {
        return error; // retorno nulo em caso de erro
      }
}

