"use client";

import { TelaNoAuth } from "@/Components/TelaNoAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { toast } from "react-toastify";
import { DashboardTemplate } from "../dashboard";
import { useVerificarUsuario } from "@/hooks/useVerifyUser";
import styles from './styles.module.scss'
export default function ListaDocumentos() {
const {loading,verifyExistUser} = useVerificarUsuario()

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
          <header>
                Header aqui
            </header>
        <main>
            <div>
                    asas
            </div>
        </main>
        </div>
       
      </div>
      
    </DashboardTemplate>
  );
}
