import {FaUser } from 'react-icons/fa'
import React, {useState,useEffect, useContext} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'
import Layout from '../../components/Layout';
import styles from '../../styles/AuthForm.module.css'
import AuthContext from '../../context/AuthContext'


export default function SignUpPage() {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const {signup, error} = useContext(AuthContext)

    useEffect(() => {
        error && toast.error(error)
    },[error]);

    

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(userName === "" || email === "" || password === "" || passwordConfirm === ""){
            toast.error("Please fill all field!")
        }else{
            if(password !== passwordConfirm){
                toast.error("Password do not match")
                console.log("Password do not match!")
                return;
            }else{
                signup({userName,email, password})
                // toast.error("register!")
            }
            
        }
        
    }
  return (
    <Layout title='Sign Up'>
        <div className={styles.auth}>
            <h1><FaUser />Sign Up</h1>
        
        
            <ToastContainer />
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='username'>Username</label>
                <input
                    type='text'
                    value={userName}
                    id="username"
                    onChange={(e) => setUserName(e.target.value)}
                />
            </div>
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

            <div>
            <label htmlFor='passwordConfirm'>Password Confirm</label>
                <input
                    type='password'
                    value={passwordConfirm}
                    id="passwordConfirm"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
            </div>

            
            <input type='submit' value='sign in' className='btn'/>
        </form>

        <p>Already have account? 
            <Link href='/auth/signin'> Sign In</Link>
        
        </p>
        </div>
    </Layout>
  )
}
