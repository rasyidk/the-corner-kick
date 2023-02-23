import Link from "next/link";

import React from 'react'
import styles from '../styles/NewsDashboard.module.css'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import {API_URL, NEXT_URL} from '../config'
export default function NewsDashboard({news, token}) {

  const router = useRouter()

  const onDeleteNews = async (e) =>{
    if(window.confirm("Are You Sure that you wanted to delete news?")){
      const res = await fetch(`${API_URL}/api/footballsports11/${news.id}`,{
        method: 'DELETE',
        headers:{
          "Content-Type": "application/json",
          Authorization : `Bearer ${token}`
      },
      })

      const data = await res.json()

      
      if(!res.ok){
        toast.error(data.error.message)
      }else{
        router.push('/auth/dashboard')
      }
    }
  }


  return (
    <div className={styles.news}>
      <div className={styles.newsitem}>
        <div>
        <h4>
          <Link legacyBehavior href={`/news/${news.slug}`}>
              <a>{news.name}</a>
          </Link>
        </h4>
        </div>
        <div>
        <Link href={`/news/edit/${news.id}`}>
          <button className="btn-edit">Edit News</button>
        </Link>

        <button className="btn-delete" onClick={onDeleteNews}>
              Delete News
        </button>
        </div>
      </div>
    </div>
  )
}
