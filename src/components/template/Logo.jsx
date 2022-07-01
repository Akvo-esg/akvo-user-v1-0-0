import styles from './Logo.module.scss'
import Link from 'next/link'

export default function Logo() {
    return (
        <aside className={styles.logo}>
            <Link href="/">
                <a>
                    <img src="/logo1.png" alt="logo" className='' />
                </a>
            </Link>
        </aside>
    )
}