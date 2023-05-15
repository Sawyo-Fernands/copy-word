"use client";

import { useVerificarUsuario } from "@/hooks/useVerifyUser";
import { DashboardTemplate } from "../dashboard";
import Loading from "../loading";
import { TelaNoAuth } from "@/Components/TelaNoAuth";
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import {useRef,useEffect} from 'react'
import styles from './styles.module.scss'
import { adicionarNovoModelo } from "@/services/initializeDataBase";
import Button from '@mui/material/Button';
import { AvatarComponent } from "@/Components/Avatar";
import { AiFillFileAdd } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";

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
          <header className={styles.header}>
          <div className={styles.containerButtons}>
          <Button onClick={gravarModelo} variant="contained">
            <div style={{display:'flex',alignItems:'center',gap:'0.1rem'}}>
            <AiFillFileAdd size={17} /> <span>Adicionar</span>
            </div>
          </Button>
          <Button onClick={gravarModelo} variant="contained">
            <div style={{display:'flex',alignItems:'center',gap:'0.1rem'}}>
            <FaMicrophone size={17} /> <span>Narrar</span>
            </div>
          </Button>
            </div>
             <div className={styles.user}>
                  <span>{user?.displayName}</span>
                  <AvatarComponent name={user?.displayName as string} image={user?.photoURL}  />
                </div>
          </header>
            <div className={styles.containerEditor} >
                <DocumentEditorContainerComponent 
                height={'94%'}
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