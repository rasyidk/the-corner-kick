import axios from 'axios'
import React,{useState} from 'react'
import styles from '../styles/Form.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

        // const res = await fetch('http://localhost:1337/api/upload',{
        // method:"POST",
        // body: formData
        // })



        // if(res.ok){
        //     imageUploaded()
        // }

        const uploadResponse = await fetch("http://localhost:1337/api/upload/", { 
            method: 'POST',
            body: formData
        });

        const data = await uploadResponse.json()
        console.log( "DATAKY",data)

        console.log('status', uploadResponse.status)

        if(uploadResponse.status === 200){
            toast.success("uploaded succesfully")
        }
        // if(data.statu){
        //     console.log( "HEHE")
        // }else{
        //     console.log( "OK")
        // }


        // const STRAPI_BASE_URL = 'http://localhost:1337';

        // const formData = new FormData()
        // formData.append('files', image)
        // formData.append('ref', 'footballsports1') // optional, you need it if you want to link the image to an entry
        // formData.append('refId', 1) // optional, you need it if you want to link the image to an entry
        // formData.append('field', 'image') // optional, you need it if you want to link the image to an entry

        // axios.post(`${STRAPI_BASE_URL}/api/upload`, formData)
    }

    


    const handleFileChange =(e) =>{
        // console.log(e.target.files)
        
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
