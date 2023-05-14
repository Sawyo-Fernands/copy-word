"use client";

import { useVerificarUsuario } from "@/hooks/useVerifyUser";
import { DashboardTemplate } from "../dashboard";
import Loading from "../loading";
import { TelaNoAuth } from "@/Components/TelaNoAuth";
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import {useRef} from 'react'
import styles from './styles.module.scss'
DocumentEditorContainerComponent.Inject(Toolbar);
export default function EditorComponent(){
    const documentEditorRef = useRef(null)
    const {loading,verifyExistUser} = useVerificarUsuario()

  if (loading) {
    return <Loading />;
  }
  if (verifyExistUser && !loading) {
    return <TelaNoAuth />;
  }

    return(
        <DashboardTemplate>
         <div className={styles.containerMain}>
         
        <main style={{height:'100%'}}>
            <div className={styles.containerEditor} >
                <DocumentEditorContainerComponent 
                height={'100%'}
                serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/" 
                enableToolbar={true}
                />    
            </div>
        </main>
         </div>
        </DashboardTemplate>
    )
}