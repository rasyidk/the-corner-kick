import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../components/Layout'


const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {
  return (
    <div className={styles.container}>

      <Layout>
        <h1>Home</h1>
        <Link legacyBehavior href='/about'>
          <a>About</a>
        </Link>
      </Layout>
      
    </div>
  )
}
