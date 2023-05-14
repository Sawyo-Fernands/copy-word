"use client";

import { useVerificarUsuario } from "@/hooks/useVerifyUser";
import { DashboardTemplate } from "../dashboard";
import Loading from "../loading";
import { TelaNoAuth } from "@/Components/TelaNoAuth";
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import {useRef,useEffect} from 'react'
import styles from './styles.module.scss'
import { adicionarNovoModelo } from "@/services/initializeDataBase";

DocumentEditorContainerComponent.Inject(Toolbar);

export default function EditorComponent(){
    const documentEditorRef = useRef<any>(null)
    const { loading, verifyExistUser, user} = useVerificarUsuario()

  if (loading) {
    return <Loading />;
  }
  if (verifyExistUser && !loading) {
    return <TelaNoAuth />;
  }

  
  async function gravarModelo(){
    const dadosUsuario = {
      userId:user.uid,
      name:user.displayName,
      email:user.email,
      modelo:documentEditorRef?.current?.documentEditor?.serialize()
    }

   const resultRequest = await adicionarNovoModelo(dadosUsuario.userId,dadosUsuario.name,dadosUsuario.email,dadosUsuario.modelo)
   console.log(resultRequest)
  }



    return(
        <DashboardTemplate>
         <div className={styles.containerMain}>
         
        <main style={{height:'100%'}}>
          <button onClick={gravarModelo}>Adicionar modelo</button>
            <div className={styles.containerEditor} >
                <DocumentEditorContainerComponent 
                height={'100%'}
                ref={(scope) => documentEditorRef.current = scope}
                serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/" 
                enableToolbar={true}
                />    
            </div>
        </main>
         </div>
        </DashboardTemplate>
    )
}