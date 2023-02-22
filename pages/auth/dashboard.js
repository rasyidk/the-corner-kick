import React from 'react'
import Layout from '../../components/Layout'
import { API_URL } from '../../config'
import { parseCookies } from '../../utils'
import {styles} from '../../styles/Dashboard.module.css'
import NewsDashboard from '../../components/NewsDashboard'

export default function dashboard({news , token}) {

  

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
            // handleDelete={deleteNews}
            token = {token}
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
  
  const backend_url = process.env.BACKEND_URL
  const frontend_url = process.env.FRONTEND_URL


  const res =  await fetch(`${backend_url}/api/footballsports11/me`,{
    method:"GET",
    headers :{
      Authorization : `Bearer ${token}`
    }
  })

  const news = await res.json()

  console.log("NEWS", news)
  return {
    props : { news , token }
  }

}