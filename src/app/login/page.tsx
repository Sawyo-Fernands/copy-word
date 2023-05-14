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
export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { setUser } = useAuthContext();
  const router = useRouter();
  //
  async function logarUSuario() {
    const retornoLogin: any = await logarUsuario(email, senha);
    if (retornoLogin.user) {
      toast.success("Usuário autenticado com sucesso!");
      setUser(retornoLogin);
      setTimeout(() => {
        router.push("/listaDocumentos");
      }, 200);
    }
    if (retornoLogin == "auth/invalid-email") {
      toast.warn("E-mail Inválido");
      document?.getElementById("emailInput")?.focus();
      setEmail("");
    }
  }

  async function autenticarComGoogle(){
    const result = await authWithGoogle()
    console.log({result})
    if (result.accessToken) {
        toast.success("Usuário autenticado com sucesso!");
        setUser(result);
        setTimeout(() => {
          router.push("/listaDocumentos");
        }, 200);
      }
      if (result == "auth/invalid-email") {
        toast.warn("E-mail Inválido");
        document?.getElementById("emailInput")?.focus();
        setEmail("");
      }
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
          <label htmlFor="" className={styles.labelSingUp}>
            Não tem uma conta?
          </label>
          <label htmlFor="" className={styles.strongLabel}>
            <Link href={"/signup"}>&nbsp;Registre-se</Link>
          </label>
        </div>
      </div>
    </>
  );
}
