import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout';
import { API_URL } from '../../config';
import styles from '../../styles/News.module.css'
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';


export default function SigleNews({ news }) {
 
  let img;
  if(news.attributes.image.data !== null){
    img =<div className={styles.image}><Image src = {news.attributes.image.data.attributes.url} width={900} height={600} /> </div>;
  }


  const onDeleteNews = async (e) =>{
    if(window.confirm("Are You Sure that you wanted to delete news?")){
      const res = await fetch(`http://localhost:1337/api/footballsports11/${news.id}`,{
        method:"DELETE"
      })

      const data = await res.json()
      if(!res.ok){
        toast.error(data.error.message)
      }else{
        router.push('/news')
      }
    }
  }

    const router = useRouter();
    // console.log("route====>", router);

    console.log("ID", news.id);
   
    return (
    <Layout>
      <div className={styles.news}>
        <div className={styles.controls}>
            <Link legacyBehavior href={`/news/edit/${news.id}`}>
                <button className='btn-edit'>Edit News</button>
            </Link>
            <button className='btn-delete' onClick={onDeleteNews}>Delete news</button>

        </div>

        <span>{moment(news.attributes.date).format("yyyy-MM-DD")} {news.attributes.time}</span>
      
      <h1>{news.attributes.name}</h1>
      <ToastContainer />
      {img}

      {/* {news.attributes.image.data.attributes.url && (
        <div className={styles.image}>
          <Image src = {news.attributes.image.data.attributes.url} width={900} height={600} />
        </div>
      )} */}

      <p>{news.attributes.detail}</p>

      <Link legacyBehavior href='/news'>
          <a className={styles.back}>Go Back</a>
      </Link>
      </div>
    </Layout>
  )
}






export async function getStaticPaths(){
  const res = await fetch("http://localhost:1337/api/footballsports11");
  const news = await res.json()
  console.log("NEWS", news.data.attributes)
  const paths = news.data.map((item)=> (
    
    {
    params : {slug: item.attributes.slug},
  }
  ));

  return{
    paths,
    fallback:true
  }
}


export async function getStaticProps({params:{slug}}){
  const res = await fetch(`http://localhost:1337/api/footballsports11?filters[slug][$eq]=${slug}&populate=*`)
  const singleNews = await res.json();
  console.log("SINGLENWS", singleNews.data)
  return{
    props : {
      news: singleNews.data[0]
    },
    revalidate:1
  }
}











// =================================================

// export async function getStaticPaths(){
//   const res = await fetch(`${API_URL}/api/news`);
//   const news = await res.json()
//   const paths = news.map((item)=> ({
//     params : {slug: item.slug},
//   }));

//   return{
//     paths,
//     fallback:true
//   }
// }


// export async function getStaticProps({params:{slug}}){
//   const res = await fetch(`${API_URL}/api/news/${slug}`)
//   const singleNews = await res.json();
//   return{
//     props : {
//       news: singleNews[0]
//     },
//     revalidate:1
//   }
// }







// export async function getServerSideProps({query:{slug}}){
//   const res = await fetch(`${API_URL}/api/news/${slug}`)
//   const singleNews = await res.json();
//   return{
//     props : {
//       news: singleNews[0]
//     }
//   }
// }