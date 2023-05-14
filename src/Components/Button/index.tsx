import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from './styles.module.scss'

interface ButtonPros extends ButtonHTMLAttributes<HTMLButtonElement>{
    children:ReactNode,
    color?:string,
}

export function Button({children,color,...props}:ButtonPros){

    return <button style={{backgroundColor:`${color ? color : ''} `}} className={styles.button} {...props}>{children}</button>
}