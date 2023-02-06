import React from 'react'
import {FaExclamationTriangle} from "react-icons/fa"
import Link from 'next/link'
import Layout from '../components/Layout'
import styles from '../styles/404.module.css'

export default function NotFound() {
  return (
    <Layout title="page not found">
        <div className={styles.error}>

            <h1><FaExclamationTriangle/> 404</h1>
            <h4>Sorry, Nothing is here</h4>
            <Link legacyBehavior href='/'>Go Back Home</Link>

        </div>


    </Layout>
  )
}
