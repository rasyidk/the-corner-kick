import React, { useEffect, useState } from 'react'
import styles from '../styles/Header.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Search from './Search'
import { useContext } from 'react'

import AuthContext from '../context/AuthContext'



export default function Header() {
    
const {user, signout} = useContext(AuthContext)
const [show,setShow] = useState(false)


  return (
    <header className={styles.header}>
        <div className={styles.logo}>
            <Link legacyBehavior href='/'>
                <a>The Corner Kick</a>
            </Link>
            <a onClick={()=>setShow(!show)}>

            <svg className={styles.logoMenu} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18v-2h18v2H3Zm0-5v-2h18v2H3Zm0-5V6h18v2H3Z"/></svg>
            </a>
        </div>
        
        <nav className={styles.navbar} >
            
            <ul>
                    <li>
                    <Search />
                    </li>
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
                           <li>
                    <Link legacyBehavior href='/about'>
                        <a>About</a>
                    </Link>
                </li>  

                           <button className='btn-secondary' onClick={() => signout()}>
                            Sign Out
                           </button>
                       </>
                       
                       ) : (
                        <>
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
                        </>
                        )
                }
                   
            </ul>
        </nav>
       

    </header>
  )
}
