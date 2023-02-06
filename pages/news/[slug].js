import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout';
import { API_URL } from '../../config';
import styles from '../../styles/News.module.css'
import Image from 'next/image';
import Link from 'next/link';

export default function SigleNews({ news }) {
    const router = useRouter();
    console.log("route====>", router);
    return (
    <Layout>
      <div className={styles.news}>
        <span>{news.date} {news.time}</span>
      </div>
      <h1>{news.name}</h1>
      {news.image && (
        <div className={styles.image}>
          <Image src = {news.image} width={900} height={600} />
        </div>
      )}

      <p>{news.detail}</p>

      <Link legacyBehavior href='/news'>
          <a className={styles.back}>Go Back</a>
      </Link>
    </Layout>
  )
}

export async function getStaticPaths(){
  const res = await fetch(`${API_URL}/api/news`);
  const news = await res.json()
  const paths = news.map((item)=> ({
    params : {slug: item.slug},
  }));

  return{
    paths,
    fallback:true
  }
}


export async function getStaticProps({params:{slug}}){
  const res = await fetch(`${API_URL}/api/news/${slug}`)
  const singleNews = await res.json();
  return{
    props : {
      news: singleNews[0]
    },
    revalidate:1
  }
}


// export async function getServerSideProps({query:{slug}}){
//   const res = await fetch(`${API_URL}/api/news/${slug}`)
//   const singleNews = await res.json();
//   return{
//     props : {
//       news: singleNews[0]
//     }
//   }
// }