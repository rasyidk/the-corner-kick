import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import styles from '../../styles/Form.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import { parseCookies } from '../../utils/index'
  
export default function AddNews({token}) {

    const [values,setValues] = useState({
        name:"",
        detail:"",
        date:"",
        time:""
    })

    const {name,detail,date,time} =values

    const router = useRouter()

    const handleSubmit = async (e) => {
        console.log("SUBMIT")
        e.preventDefault();
        const emptyFieldCheck = Object.values(values).some(
            (element) => element ===""
        )

        if(emptyFieldCheck){
            toast.error("Please fill all input field!")
        }

        console.log("VAL", values)

        const response = await fetch('http://localhost:1337/api/footballsports11',{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            },
            body:JSON.stringify({
                'data': values 
            })

        })

        if(!response.ok){
            if(response.status === "403" || response.status === "401"){
                toast.error("No Token Provided")
                return;
            } 
            toast.error("Something went wrong")
        }else{
            const sport = await response.json()
            console.log("SPORT",sport.data.attributes.slug)
            console.log("ms", sport)
            router.push(`/news/${sport.data.attributes.slug}`)
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({ ...values, [name]: value})
    }
  return (
    <Layout title="Add new football news">
        <Link legacyBehavior href="/news">Go Back</Link>
        <h2>Add football news</h2>
        <ToastContainer />
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.grid}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                    name='name'
                    type='text'
                    id='name'
                    value={name}
                    onChange={handleInputChange} 
                    />
                </div>

                <div>
                    <label htmlFor="date">Date</label>
                    <input
                    name='date'
                    type='date'
                    id='date'
                    value={date}
                    onChange={handleInputChange} 
                    />
                </div>

                <div>
                    <label htmlFor="time">Time</label>
                    <input
                    name='time'
                    type='text'
                    id='time'
                    value={time}
                    onChange={handleInputChange} 
                    />
                </div>

                
                
            </div>
            <div>
                    <label htmlFor="name">Detail</label>
                    <textarea
                    name='detail'
                    type='text'
                    id='detail'
                    value={detail}
                    onChange={handleInputChange} 
                    />
                </div>

            <input className='btn' type='submit' value="Add News"/>
        </form>
    </Layout>
  )
}


export async function getServerSideProps({req}){
    const {token} = parseCookies(req)

    return{
        props : { token }
    }
}