import React from 'react'
import styles from '../styles/Header.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Search from './Search'
import { useContext } from 'react'

import AuthContext from '../context/AuthContext'



export default function Header() {
    
const {user, signout} = useContext(AuthContext)

    // console.log("HHEHEH", user)
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


                {
                    user ? (
                        <>
                           <li>
                               <Link legacyBehavior href='/news/add'>
                                   <a>Add News</a>
                               </Link>
                           </li>
                           <li>
                               <Link legacyBehavior href='/auth/dashboard'>
                                   <a>Dashboard</a>
                               </Link>
                           </li>

                           <button className='btn-secondary' onClick={() => signout()}>
                            Sign Out
                           </button>
                       </>
                       
                       ) : (
                        <>
                            <li>
                                <Link legacyBehavior href='/auth/signin'>
                                    <a className='btn-secondary'>Sign in</a>
                                </Link>
                            </li>
                        </>
                        )
                }
                

                


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
