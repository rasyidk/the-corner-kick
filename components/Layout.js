import React from 'react'
import Head from 'next/head'
import styles from  '../styles/Layout.module.css'
import Header from './Header'
import Footer from './Footer'
import Hero from './Hero'
import { useRouter } from 'next/router'

export default function Layout({title, keywords, description, children}) {
  
  const router =useRouter();
 
  
  return (
    <div>
      <Head>
        <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      </Head>

      <Header/>
      {router.pathname === '/' && <Hero />}
      <div className={styles.container}>{children}</div>

      <Footer />
    </div>
  )
}

Layout.defaultProps = {
    title: "sport news | find latest sport news",
    description : "a website that brings you latest news about sports",
    keywords : "football"
}