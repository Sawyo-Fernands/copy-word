"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
import { Input } from "@/Components/Input";
import { Button } from "@/Components/Button";
import Link from "next/link";
import { createNewUser } from "@/services/newUser";
import { useAuthContext } from "@/context/useAuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { setUser } = useAuthContext();
  const router = useRouter();

  async function cadastrarUsuario() {
    
    if(!email || !senha){
      toast.warn('Preencha os campos!')
      document?.getElementById("emailInput")?.focus();
      return
    }

    const retornoCadastro : any = await createNewUser(email, senha);
    
    if(retornoCadastro?.user){
        toast.success("Usuário cadastrado com sucesso!");
        setUser(retornoCadastro);
        setTimeout(() => {
          router.push("/listaDocumentos");
        }, 100);
        return
    }
    if(retornoCadastro == "auth/invalid-email"){
        toast.warn('E-mail Inválido ou senha inválidos')
        document?.getElementById('emailInput')?.focus()
        setEmail('')
        setSenha("")
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
        <div className={styles.containerMain}>
        <div className={styles.content}>
          <Image
            src="/copyWordLogin.png"
            width={70}
            height={70}
            alt="Picture of the author"
          />
          <label htmlFor="" className={styles.label}>
            Cadastro
          </label>
          <Input
            name="email"
            value={email}
            id='emailInput'
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            type="email"
          />
          <Input
            name="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            type="password"
          />
          <Button onClick={cadastrarUsuario}>Cadastrar</Button>
          <label htmlFor="" className={styles.labelSingUp}>
            Já possui uma conta?
          </label>
          <label htmlFor="" className={styles.strongLabel}>
            <Link href={"/"}>&nbsp;Faça Login</Link>
          </label>
        </div>
        </div>
      </div>
    </>
  );
}
