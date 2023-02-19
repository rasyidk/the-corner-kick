import React from 'react'
import Layout from '../../components/Layout'
import { API_URL } from '../../config'
import { parseCookies } from '../../utils'
import {styles} from '../../styles/Dashboard.module.css'
import NewsDashboard from '../../components/NewsDashboard'

export default function dashboard({news}) {

  const deleteNews = () =>{
    
  }

  console.log("news", news)
  return (
    <Layout title="Dashboard">
      <div>
        <h1>Dashboard</h1>
        <h3>My News</h3>
        {
          news.data.attributes.results && news.data.attributes.results.map((item) => (
            <NewsDashboard 
            key={item.id}
            news = {item}
            handleDelete={deleteNews}
            />
          ))
        }
      </div>
    </Layout>
  )
}


export async function getServerSideProps({req}){
  const {token} = parseCookies(req)

  console.log("token", token)
  const res =  await fetch(`http://localhost:1337/api/footballsports11/me`,{
    method:"GET",
    headers :{
      Authorization : `Bearer ${token}`
    }
  })

  const news = await res.json()

  console.log("NEWS", news)
  return {
    props : { news }
  }

}