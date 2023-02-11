import React from 'react'
import styles from '../styles/Header.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Search from './Search'
export default function Header() {
  return (
    <header className={styles.header}>
        <div className={styles.logo}>
            <Link legacyBehavior href='/'>
                <a>The Corner Kick</a>
            </Link>
        </div>
        <Search />
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

                <li>
                    <Link legacyBehavior href='/auth/signin'>
                        <a className='btn-secondary'>Sign in</a>
                    </Link>
                </li>

                <li>
                    <Link legacyBehavior href='/news/add'>
                        <a>Add</a>
                    </Link>
                </li>

               
            </ul>
        </nav>

    </header>
  )
}
