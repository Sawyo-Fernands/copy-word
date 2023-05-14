import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, query, where,getDocs, QuerySnapshot, } from "firebase/firestore";
import { app } from "./firebase";

// Initialize Realtime Database and get a reference to the service
export const db = getFirestore(app);

export async function adicionarNovoModelo(id:string,ususario:string,email:string,modelo:string){
    try {
        const docRef = await addDoc(collection(db, "modelos"), {
            id:id,
          usuario: ususario,
          email: email,
          modelo:modelo
        });
        console.log(docRef);
        return docRef
      } catch (e) {
        console.error(e);
        return e
      }
}

