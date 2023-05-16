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
import { adicionarNovoModelo } from '@/services/initializeDataBase';
import { useVerificarUsuario } from '@/hooks/useVerifyUser';
import { ImageFormat } from '@syncfusion/ej2-react-documenteditor';
import {
  PdfDocument,
  PdfPageOrientation,
  PdfPageSettings,
  PdfSection,
  SizeF,
} from '@syncfusion/ej2-pdf-export';


interface ModalNovoDocumentoProps{
    openModal:boolean;
    setOpenModal:(value:boolean) => void;
    documentEditorRef:any;
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
    zIndex:'99999999999999999999999999999999999999'
  };

export  function ModalNovoDocumento({openModal,setOpenModal,documentEditorRef} :ModalNovoDocumentoProps) {

  const [nomeDocumento,setNomeDocumento] = useState('')
  const { user } = useVerificarUsuario()
    console.log({openModal})
  const handleClose = () => {
    setOpenModal(false);
    setNomeDocumento('')
  };
  
  async function gravarModelo(){
    const imageDocument = await generateImageBase64(documentEditorRef)
    const dadosUsuario = {
      userId:user.uid,
      name:user.displayName,
      email:user.email,
      modelo:documentEditorRef?.current?.documentEditor?.serialize(),
      image:imageDocument
    }

   const resultRequest = await adicionarNovoModelo(
    dadosUsuario.userId,dadosUsuario.name,
    nomeDocumento,dadosUsuario.email,dadosUsuario.modelo,
    dadosUsuario.image)
    
    if(resultRequest){
      handleClose()
      toast.success('Modelo gravado com sucesso!')
    }
  }

  async function generateImageBase64(
    documentEditorRef: React.RefObject<any>
  ): Promise<string> {
    const format: ImageFormat = 'image/jpeg'  as ImageFormat;
    const image = documentEditorRef.current.documentEditor.exportAsImage(1, format);
    const pdfDocument = new PdfDocument();
    return new Promise((resolve, reject) => {
      image.onload = function () {
        const imageHeight = parseInt(
          image.style.height.toString().replace('px', '')
        );
        const imageWidth = parseInt(
          image.style.width.toString().replace('px', '')
        );
        const section: PdfSection = pdfDocument.sections.add() as PdfSection;
        const settings: PdfPageSettings = new PdfPageSettings(0);
        if (imageWidth > imageHeight) {
          settings.orientation = PdfPageOrientation.Landscape;
        }
        settings.size = new SizeF(imageWidth, imageHeight);
        section.setPageSettings(settings);
        const page = section.pages.add();
        const imageStr = image.src.replace('data:image/jpeg;base64,', '');
        resolve(imageStr);
      };
      image.onerror = function () {
        reject(new Error('Erro ao gerar imagem em base64'));
      };
    });
  }

  useEffect(()=>{
    if(openModal){
        setTimeout(() => {
            document.getElementById('inputnameDocumento')?.focus()
        }, 200);
    }
  },[openModal])

  return (
      <Modal open={openModal} onClose={handleClose}  sx={{zIndex:'9999999999999999999999999999'}}>
        <Box sx={style}>
        <DialogContent >
          <DialogContentText>
           Nome Documento :
          </DialogContentText>
          <Input id='inputnameDocumento' style={{width:'100%'}} value={nomeDocumento} type='text' onChange={(e=>setNomeDocumento(e.target.value))} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={gravarModelo}>Adicionar</Button>
        </DialogActions>
        </Box>
      </Modal>
  );
}