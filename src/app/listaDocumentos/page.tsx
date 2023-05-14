"use client";

import { TelaNoAuth } from "@/Components/TelaNoAuth";
import { useAuthContext } from "@/context/useAuthContext";
import { auth } from "@/services/loginUser";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { toast } from "react-toastify";
import { DashboardTemplate } from "../dashboard";

export default function ListaDocumentos() {
  const { user, setUser } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const verifyExistUser = Object.keys(user).length == 0;

  useEffect(() => {
    handlePersistScreenIfAuth();
  }, []);

  function handlePersistScreenIfAuth() {
    if (!verifyExistUser) {
      console.log(user);
      setLoading(false);
      return;
    }
    onAuthStateChanged(auth, (user: any) => {
      console.log(user);
      if (user) {
        setUser(user);
      }
      setLoading(false);
    });
  }


  if (loading) {
    return <Loading />;
  }
  if (verifyExistUser && !loading) {
    return <TelaNoAuth />;
  }

  return (
    <DashboardTemplate>
      <div>
        <h1>Lista Documentos</h1>
      </div>
    </DashboardTemplate>
  );
}
