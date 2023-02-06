import Head from 'next/head'
import Image from 'next/image'


import Link from 'next/link'
import Layout from '../../components/Layout'
import {API_URL} from '../../config/index.js'
import NewsItem from '../../components/NewsItem'
import styles from '../../styles/News.module.css'



export default function News({ news }) {
  // console.log("news", news.name);
  return (
    <div>

      <Layout>
        <h1>News</h1>


        {news.length === 0 && <h3>No News</h3>}

        {news.map((item) =>(
          <NewsItem key={item.id} news = {item}/>
        ) )}

        <Link legacyBehavior href='/'>
          <a className={styles.back}>Go Back</a>
        </Link>

      
        
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
    
  const res = await fetch("http://localhost:3000/api/news");
  const news = await res.json();
 
  console.log("AYE")
  return {
      props : {news },
      
  };
}
