

import styles from './styles.module.scss'
import Button from '@mui/material/Button';
interface CardProps{
    imagemUrl:string,
    nomeDocumento:string;
    onEditar:() => void;
    onExcluir:() => void;
}

export function CardComponent({ imagemUrl, onEditar, onExcluir,nomeDocumento }:CardProps) {
    return (
      <div className={styles.card}>
        <img src={'data:image/jpeg;base64,'+imagemUrl} alt="Imagem" />
        <span>{nomeDocumento}</span>
        <div className={styles.cardBotoes}>
          <Button onClick={onEditar} variant='contained' color='primary'>Editar</Button>
          <Button onClick={onExcluir} variant='contained' color='error'>Excluir</Button>
        </div>
      </div>
    );
  }
  