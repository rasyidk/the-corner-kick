import axios from 'axios'
import React,{useState} from 'react'
import styles from '../styles/Form.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {API_URL, NEXT_URL} from '../config'
export default function ImageUpload({sportNewsId,imageUploaded}) {

    console.log("sportNewsId",sportNewsId)
    const [image, setImage] =useState(null)
    const handleSubmit = async (e) =>{
      
        e.preventDefault();
        const formData = new FormData()
        formData.append("files", image)
        formData.append("ref", 'api::footballsports1.footballsports1')
        formData.append("refId", sportNewsId)
        formData.append("field", "image")

        const uploadResponse = await fetch(`${API_URL}/api/upload/`, { 
            method: 'POST',
            body: formData
        });

        const data = await uploadResponse.json()
      

        if(uploadResponse.status === 200){
            toast.success("uploaded succesfully")
        }
       
    }


    const handleFileChange =(e) =>{
        setImage(e.target.files[0])
    }
  return (
    <div className={styles.form}>
        <h4>Upload Football News Image</h4>
        <form onSubmit={handleSubmit}>
            <div className={styles.file}>
                <input type='file' onChange={handleFileChange}/>
            </div>
            <input type='submit' value='upload' className='btn' />
        </form>
    </div>
  )
}
