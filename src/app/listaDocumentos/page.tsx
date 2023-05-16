"use client";

import { TelaNoAuth } from "@/Components/TelaNoAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { toast } from "react-toastify";
import { DashboardTemplate } from "../dashboard";
import { useVerificarUsuario } from "@/hooks/useVerifyUser";
import styles from './styles.module.scss'
import { useGetDataModels } from "@/hooks/getDataModels";
import { AvatarComponent } from "@/Components/Avatar";
import { CardComponent } from "@/Components/Card";
export default function ListaDocumentos() {
const {loading,verifyExistUser,user} = useVerificarUsuario()
const { listaModelos } = useGetDataModels()
  console.log(listaModelos)
  if (loading) {
    return <Loading />;
  }
  if (verifyExistUser && !loading) {
    return <TelaNoAuth />;
  }

  return (
    <DashboardTemplate>
      <div className={styles.containerMain}>
        <div className={styles.containerContent}>
          <header className={styles.header}>
                <div className={styles.user}>
                  <span>{user?.displayName}</span>
                  <AvatarComponent name={user?.displayName as string} image={user?.photoURL}  />
                </div>
            </header>
        <main className={styles.mainListagem}>
            {
              listaModelos.map((modelo) => (
                <CardComponent
                key={modelo.id}
                  imagemUrl={modelo.image}
                  nomeDocumento={modelo.nomeDocumento}
                  onEditar={()=>{}}
                  onExcluir={()=>{}}
                />
              ))
            }
        </main>
        </div>
       
      </div>
      
    </DashboardTemplate>
  );
}
