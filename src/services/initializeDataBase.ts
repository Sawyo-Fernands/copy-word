import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, doc } from "firebase/firestore";
import { app } from "./firebase";
import { v4 as uuidv4 } from "uuid";

// Initialize Realtime Database and get a reference to the service
export const db = getFirestore(app);

export async function adicionarNovoModelo(id:string,ususario:string,nomeDocumento:string,email:string,modelo:string,image:string){

  function gerarIdAleatorio() {
    return uuidv4();
  }

    try {
        const docRef = await addDoc(collection(db, "modelos"), {
          ususarioId:id,
          nomeDocumento:nomeDocumento,
          usuario: ususario,
          email: email,
          modelo:modelo,
          image:image,
          id:gerarIdAleatorio()
        });
        return docRef.id
      } catch (e) {
        console.error(e);
        return e
      }
}

