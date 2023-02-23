import Head from 'next/head'
import Image from 'next/image'


import Link from 'next/link'
import Layout from '../../components/Layout'
import {API_URL, NEXT_URL} from '../../config/index.js'
import NewsItem from '../../components/NewsItem'
import styles from '../../styles/News.module.css'

import {useRouter} from 'next/router'


export default function Search({ news }) {
 
  const router = useRouter()

  return (
    <div>

      <Layout title="Search Results">
        <h1>Search Result for {router.query.term}</h1>


        {news.data.length === 0 && <h3>No Search for {router.query.term} </h3>}

        {news.data.map((item) =>(
          <NewsItem key={item.id} news = {item}/>
        ) )}

        <Link legacyBehavior href='/'>
          <a className={styles.back}>Go Back</a>
        </Link>


      </Layout>
      
    </div>
  )
}




export async function getServerSideProps({query:{term}}){

   
    
  const res = await fetch(`${API_URL}/api/footballsports11?filters[$or][0][name][$contains]=${term}&filters[$or][1][detail][$contains]=${term}&populate=*`);
  const news = await res.json();
 
  
  return {
      props : {news},
      
  };
}
