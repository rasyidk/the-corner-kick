import Head from 'next/head'
import Image from 'next/image'


import Link from 'next/link'
import Layout from '../../components/Layout'
import { API_URL, NEXT_URL } from '../../config';
import NewsItem from '../../components/NewsItem'
import styles from '../../styles/News.module.css'
import Pagination from '../../components/Pagination'

const PER_PAGE = 2;

export default function News({ news,page , total}) {
 
  return (
    <div>

      <Layout>

        <Link legacyBehavior href='/'>
          <a className={styles.back}>Go Back</a>
        </Link>


        <h1>News</h1>

        {news.data.length === 0 && <h3>No News</h3>}

        {news.data.map((item) =>(
          <NewsItem key={item.id} news = {item}/>
        ) )}

        
        <Pagination page={page} total={total} />

      
        
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



export async function getServerSideProps({query : {page=1}}){

  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE 
    
  const res = await fetch(`${API_URL}/api/footballsports11?sort=date%3Adesc&pagination[limit]=${PER_PAGE}&pagination[start]=${start}&populate=*`);
  const news = await res.json();

  const total = news.meta.pagination.total
  
 
  
  return {
      props : {news, page: +page,total},
      
  };
}
