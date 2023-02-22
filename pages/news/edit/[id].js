import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'
import styles from '../../../styles/Form.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import Modal from '../../../components/Modal'
import Image from 'next/image'
import ImageUpload from '../../../components/ImageUpload'
import { parseCookies } from '../../../utils/index'

export default function EditNews({sportNews,token,  backend_url, frontend_url}) {

    // console.log("imagee HAHAH",sportNews.data.attributes.image.data.attributes.url)

    const [values,setValues] = useState({
        name:sportNews.data.attributes.name,
        detail:sportNews.data.attributes.detail,
        date:sportNews.data.attributes.date,
        time:sportNews.data.attributes.time
    })

    const [imagePreview, setImagePreview] = useState(
        sportNews.data.attributes.image.data ? sportNews.data.attributes.image.data.attributes.url : null
    )

   
    const [showModal,setShowModal] = useState(false)

    const {name,detail,date,time} = values

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

        // const response = await fetch(`http://localhost:1337/api/footballsports11/${sportNews.data.id}?populate=*`,{
        //     method:"PUT",
        //     headers:{
        //         "Content-Type": "application/json"
        //     },
        //     body:JSON.stringify({
        //         'data': values 
        //     })

        // })

        
        const response = await fetch(`${backend_url}/api/footballsports11/${sportNews.data.id}`,{
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            },
            body:JSON.stringify({
                'data': values 
            })

        })


        if(!response.ok){
            toast.error("Something went wrong")
        }else{
            const sport = await response.json()
            console.log("SPORT",sport.data.attributes.slug)
            router.push(`/news/${sport.data.attributes.slug}`)
        }
    }

    const imageUploaded = async (e) =>{
        console.log("uplaoded image")
        const res = await fetch(`http://localhost:1337/api/footballsports11/${sportNews.data.id}`)
        const data = await res.json()
        setImagePreview(data.data.attributes.image.data.attributes.url)
        setShowModal(false)
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({ ...values, [name]: value})
    }

  return (
    <Layout title="Add new football news">
        <Link legacyBehavior href="/news">Go Back</Link>
        <h2>Edit football news</h2>
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
                    value={moment(date).format("yyyy-MM-DD")}
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

            <input className='btn' type='submit' value="Edit News"/>
        </form>

        {
            imagePreview ? (
                <Image src={imagePreview} height={100} width={180} />
            ) :(
                <div>
                    <p>No image Available</p>
                </div>
            )
        }

        <div>
            <button onClick={() => setShowModal(true)} className='btn-edit'>Update Image</button>
        </div>

        <Modal show = {showModal} onClose={() => setShowModal(false)}>
            <ImageUpload sportNewsId={sportNews.data.id} imageUploaded = {imageUploaded} />
        </Modal>
    </Layout>
  )
}


export async function getServerSideProps({params: {id}, req}){
    console.log("COOKIE",req.headers.cookie)
    const {token} = parseCookies(req)

    const backend_url = process.env.BACKEND_URL
    const frontend_url = process.env.FRONTEND_URL

    const res = await fetch(`${backend_url}/api/footballsports11/${id}?populate=*`)
    const sportNews = await res.json()
    // console.log(sportNews)
    return{

        props:{
            sportNews, token, backend_url, frontend_url
        }
    }
}

