import React from 'react'
import styles from '../styles/Header.module.css'
import Image from 'next/image'
import Link from 'next/link'
export default function Header() {
  return (
    <header className={styles.header}>
        <div className={styles.logo}>
            <Link legacyBehavior href='/'>
                <a>The Corner Kick</a>
            </Link>
        </div>
        <nav>
            <ul>
                <li>
                    <Link legacyBehavior href='/news'>
                        <a>News</a>
                    </Link>
                </li>

                <li>
                    <Link legacyBehavior href='/about'>
                        <a>About</a>
                    </Link>
                </li>

               
            </ul>
        </nav>

    </header>
  )
}
