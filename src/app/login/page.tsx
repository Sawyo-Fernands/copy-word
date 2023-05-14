"use client";

import { MouseEventHandler, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Input } from "@/Components/Input";
import { Button } from "@/Components/Button";
import Link from "next/link";
import { useAuthContext } from "@/context/useAuthContext";
import { logarUsuario } from "@/services/loginUser";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { authWithGoogle } from "@/services/authWithGoogle";
import {AiFillGoogleCircle,AiOutlineLogin} from 'react-icons/ai'
import { ModalRedefinirSenha } from "@/Components/ModalRedefinirSenha";
export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [openModalRedefinirSenha,setOpenModalredefinirSenha] = useState(false)
  const { setUser } = useAuthContext();
  const router = useRouter();
  //
  async function logarUSuario() {

    if(!email || !senha){
      toast.warn('Preencha os campos!')
      document?.getElementById("emailInput")?.focus();
      return
    }

    const retornoLogin: any = await logarUsuario(email, senha);
    if (retornoLogin.user) {
      toast.success("Usuário autenticado com sucesso!");
      setUser(retornoLogin);
      setTimeout(() => {
        router.push("/listaDocumentos");
      }, 200);
    }
    if(retornoLogin == "auth/user-not-found"){
      toast.warn("Usuário não cadastrado! Crie uma conta.");
      return
    }
    if (retornoLogin == "auth/invalid-email") {
      toast.warn("E-mail Inválido");
      document?.getElementById("emailInput")?.focus();
      setEmail("");
      setSenha('')
    }
    if (retornoLogin == "auth/wrong-password") {
      toast.warn("Senha inválida");
      document?.getElementById("emailInput")?.focus();
      setSenha('')
    }
  }

  async function autenticarComGoogle(){
    const result = await authWithGoogle()
    if (result.accessToken) {
        toast.success("Usuário autenticado com sucesso!");
        setUser(result);
        setTimeout(() => {
          router.push("/listaDocumentos");
        }, 100);
      }
      if (result == "auth/invalid-email") {
        toast.warn("E-mail Inválido");
        document?.getElementById("emailInput")?.focus();
        setEmail("");
      }
  }

  return (
    <>
    <ModalRedefinirSenha
    openModal={openModalRedefinirSenha}
    setOpenModal={setOpenModalredefinirSenha}
    />
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
      <div className={styles.containerMain}>
        <div className={styles.containerMain}>
        <div className={styles.content}>
          <Image
            src="/copyWordLogin.png"
            width={70}
            height={70}
            alt="Picture of the author"
          />
          <label htmlFor="" className={styles.label}>
            Login
          </label>
          <Input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            id="emailInput"
            type="email"
          />
          <Input
            name="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            type="password"
          />
          <div style={{display:'flex',alignItems:'center',gap:'0.1rem',flexDirection:'column',width:'100%'}}>
          <Button onClick={logarUSuario}><AiOutlineLogin size={27} /> Entrar</Button>
          <Button color="rgb(201, 72, 72)" onClick={()=>autenticarComGoogle()}> <AiFillGoogleCircle  size={27} /> Entrar Com Google</Button>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'0.2rem'}}>
          <label htmlFor="" className={styles.labelSingUp}>
            Não tem uma conta?
          </label>
          <label htmlFor="" className={styles.strongLabel}>
            <Link href={"/signup"}>&nbsp;Registre-se</Link>
          </label>
          </div>
         
          <label htmlFor="" className={styles.strongLabel} onClick={()=>setOpenModalredefinirSenha(true)}>
          &nbsp;Esqueceu senha?
          </label>
          
        </div>
        </div>
       
      </div>
    </>
  );
}
