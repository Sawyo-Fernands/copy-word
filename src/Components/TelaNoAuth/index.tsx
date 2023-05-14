import Image from 'next/image'
import styles from './styles.module.scss'
import Link from 'next/link'

export function TelaNoAuth(){


    return(
        <main className={styles.containerMain}>
            <div className={styles.contentScreen}>
            <Image
                src="/error401.svg"
                width={400}
                height={400}
                alt="Picture of the author"
                />
                <span>Usuário não Autenticado!  <Link href={'/'}>Retorne a tela de login!</Link></span>
            </div>
        </main>
    )
}