"use client";

import { useVerificarUsuario } from "@/hooks/useVerifyUser";
import { DashboardTemplate } from "../dashboard";
import Loading from "../loading";
import { TelaNoAuth } from "@/Components/TelaNoAuth";
import {
  DocumentEditorContainerComponent,
  ImageFormat,
  Toolbar,
} from "@syncfusion/ej2-react-documenteditor";
import { useRef, useState } from "react";
import styles from "./styles.module.scss";
import Button from "@mui/material/Button";
import { AvatarComponent } from "@/Components/Avatar";
import { AiFillFileAdd } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";
import { ModalNovoDocumento } from "@/Components/ModalAdicionarModelo";
DocumentEditorContainerComponent.Inject(Toolbar);

export default function EditorComponent() {
  const documentEditorRef = useRef<any>(null);
  const { loading, verifyExistUser, user } = useVerificarUsuario();
  const [openModalAddDocumento, setOpenModalAddDocumento] = useState(false);
  if (loading) {
    return <Loading />;
  }
  if (verifyExistUser && !loading) {
    return <TelaNoAuth />;
  }

  function imprimirModeloDocumento(){
    documentEditorRef.current.documentEditor.print();
  }

  return (
    <>
      <ModalNovoDocumento
      documentEditorRef={documentEditorRef}
      openModal={openModalAddDocumento}
      setOpenModal={setOpenModalAddDocumento}
      />
      <DashboardTemplate>
        <div className={styles.containerMain}>
          <main style={{ height: "100%" }}>
            <header className={styles.header}>
              <div className={styles.containerButtons}>
                <Button
                  onClick={() => setOpenModalAddDocumento(true)}
                  variant="contained"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.1rem",
                    }}
                  >
                    <AiFillFileAdd size={17} /> <span>Adicionar</span>
                  </div>
                </Button>
                <Button
                  onClick={imprimirModeloDocumento}
                  variant="contained"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.1rem",
                    }}
                  >
                    <AiFillFileAdd size={17} /> <span>Imprimir</span>
                  </div>
                </Button>
              </div>
              <div className={styles.user}>
                <span>{user?.displayName}</span>
                <AvatarComponent
                  name={user?.displayName as string}
                  image={user?.photoURL}
                />
              </div>
            </header>
            <div className={styles.containerEditor}>
              <DocumentEditorContainerComponent
                height={"94%"}
                ref={(scope) => (documentEditorRef.current = scope)}
                serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
                enableToolbar={true}
              />
            </div>
          </main>
        </div>
      </DashboardTemplate>
    </>
  );
}
