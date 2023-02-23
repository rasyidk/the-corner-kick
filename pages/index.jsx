import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../components/Layout'
import {API_URL} from '../config/index.js'
import NewsItem from '../components/NewsItem'

const inter = Inter({ subsets: ['latin'] })

export default function HomePage({ news }) {
  
  return (
    <div className={styles.bg}>

      <Layout>
        <h1 className={styles.h1}>Latest News</h1>


        {news.length === 0 && <h3>No News</h3>}

        {news.map((item) =>(
          <NewsItem key={item.id} news = {item}/>
        ) )}

        {news.length >0 && (
          <Link legacyBehavior href='/news'>
              <a className='btn-secondary'>View All news</a>
          </Link>
        )}
        
        {/* {news.map((item)=>
          (
            <h1>{item.name} </h1>
          )
        )} */}

      </Layout>
      
    </div>
  )
}

// export async function getServerSideProps(){
//     const res = await fetch(`${API_URL}/api/news`);
//     const news = await res.json();
    
//     return{
//       props : {news},
//     };
// }



export async function getServerSideProps(){
    
  // const res = await fetch("http://localhost:3000/api/news");

  const res = await fetch("http://localhost:1337/api/footballsports11?populate=*");

  const myres = await res.json();

 
  // console.log(news)
  return {
      props : {news : myres.data.slice(0,2)},
      
  };
}
