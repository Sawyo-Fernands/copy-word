'use client'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState,useEffect } from 'react';
import { Input } from '../Input';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from '@/services/firebase';
import { toast } from 'react-toastify';

interface ModalRedefinirSenhaProps{
    openModal:boolean;
    setOpenModal:(value:boolean) => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    outline:'none',
    border:'none',
    borderRadius:'0.25rem',
    zIndex:'9999999999999999999999999'
  };

export  function ModalRedefinirSenha({openModal,setOpenModal} :ModalRedefinirSenhaProps) {

  const handleClose = () => {
    setOpenModal(false);
  };
  const [email,setEmail] = useState('')

  function solicitarRedefinicaoSenha(){
    if(!email){
        toast.warn('Preencha o campo de e-mail!')
    }
    const auth = getAuth(app);
    sendPasswordResetEmail(auth, email)
    .then((response) => {
        handleClose()
        toast.success('Solicitação de redefinição de senha enviada para o email!')
    })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(error)
  });
  }

  useEffect(()=>{
    if(openModal){
        setTimeout(() => {
          setEmail('')
            document.getElementById('inputEmail')?.focus()
        }, 200);
    }
  },[openModal])

  return (
    <div style={{zIndex:'99999999999999999999999999'}}>
      <Modal sx={{zIndex:'99999999999999999999999999'}} open={openModal} onClose={handleClose} >
        <Box sx={style}>
        <DialogTitle>Redefinir Senha</DialogTitle>
        <DialogContent >
          <DialogContentText>
           Digite seu e-mail para solicitar a redefinição de senha
          </DialogContentText>
          <Input id='inputEmail' style={{width:'93%'}} value={email} type='email' onChange={(e=>setEmail(e.target.value))} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={solicitarRedefinicaoSenha}>Redefinir</Button>
        </DialogActions>
        </Box>
      </Modal>
    </div>
  );
}