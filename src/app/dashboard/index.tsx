"use client";
import { ReactNode } from "react";
import styles from './styles.module.scss'
import Image from "next/image";
import { AiFillFileAdd } from "react-icons/ai";
import { FaClipboardList } from 'react-icons/fa'
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/services/firebase";
import { ToastContainer, toast } from "react-toastify";
interface DashboardTemplateProps {
  children: ReactNode;
}

export function DashboardTemplate({ children }: DashboardTemplateProps) {

    const asPath = usePathname();
    const router = useRouter();

    function activeLink(path:string) {
        return asPath === `${path}` ? `${styles.activeLink}` : `${styles.link}`
      }

    
  function logOut() {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        toast.warn("Erro ao realizar a operação!");
      });
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    <section className={styles.containerMain}>
     
     <div className={styles.menu}>
       <aside>
           <h1>COPYWORD</h1>
           <div id={styles.sidebar}>
               <ul>
                   <li><Link href="/listaDocumentos" className={activeLink('/listaDocumentos')}><FaClipboardList size={20} /> Meus documentos</Link> </li>
                   <li><Link href="editor" className={activeLink('/editor')}><AiFillFileAdd size={20} /> Novo Documento</Link></li>
                   <li onClick={logOut}><span className={styles.link} ><AiFillFileAdd size={20} /> Sair</span></li>

               </ul>
           </div>

       </aside>
   </div>
     <div className={styles.contentDashboard}>{children}</div>
   </section>
    </>
  );
}
