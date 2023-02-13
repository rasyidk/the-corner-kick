import {FaUser } from 'react-icons/fa'
import React, {useState,useEffect, useContext} from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link'
import Layout from '../../components/Layout';
import styles from '../../styles/AuthForm.module.css'

import AuthContext from '../../context/AuthContext'

export default function SignInPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {signin,error} = useContext(AuthContext)

    useEffect(() => {
        error && toast.error(error)
    },[error]);


  


    const handleSubmit = (e) =>{
        e.preventDefault()
        signin({email, password})
    }
  return (
    <Layout title='Sign In'>
        <div className={styles.auth}>
            <h1><FaUser />Sign In</h1>
        
        

        <form onSubmit={handleSubmit}>
        <ToastContainer />
            <div>
                <label htmlFor='email'>Email</label>
                <input
                    type='text'
                    value={email}
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
            <label htmlFor='email'>Password</label>
                <input
                    type='password'
                    value={password}
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <input type='submit' value='sign in' className='btn'/>
        </form>

        <p>Dont have account? 
            <Link href='/auth/signup'>Sign Up</Link>
        
        </p>
        </div>
    </Layout>
  )
}
