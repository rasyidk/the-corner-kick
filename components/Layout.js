import React from 'react'
import Head from 'next/head'
import styles from  '../styles/Layout.module.css'

export default function Layout({title, keywords, description, children}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      </Head>
      <div className={styles.container}>{children}</div>
    </div>
  )
}

Layout.defaultProps = {
    title: "sport news | find latest sport news",
    description : "a website that brings you latest news about sports",
    keywords : "football"
}