import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout';
import { API_URL } from '../../config';
import styles from '../../styles/News.module.css'
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import { parseCookies } from '../../utils/index'
// const backend_url = process.env.BACKEND_URL
// const frontend_url = process.env.FRONTEND_URL




export default function SigleNews({ news}) {

  let img;
  if(news.attributes.image.data !== null){
    img =<Image src = {news.attributes.image.data.attributes.url} fill style={{objectFit:"cover"}}/> ;
    // img =<Image src = {news.attributes.image.data.attributes.url} fill style={{objectFit:"cover"}}/> ;
  }

    const router = useRouter();


     
    return (
    <Layout>
      <div className={styles.news}>
        {/* <div className={styles.controls}>
            <Link legacyBehavior href={`/news/edit/${news.id}`}>
                <button className='btn-edit'>Edit News</button>
            </Link>
            <button className='btn-delete' onClick={onDeleteNews}>Delete news</button>

        </div> */}

        <span>{moment(news.attributes.date).format("yyyy-MM-DD")} {news.attributes.time}</span>
      
      <h1>{news.attributes.name}</h1>
      <ToastContainer />
      <div className={styles.img}>
            {img}
        </div>

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
  const res = await fetch(`${API_URL}/api/footballsports11`);
  const news = await res.json()


  const paths = news.data.map((item)=> (
    
    {
    params : {slug: item.attributes.slug},
  }
  ));

  return{
    paths,
    fallback:true,
    
  }
}


export async function getStaticProps({params:{slug}}){
  
 
 
  const res = await fetch(`${API_URL}/api/footballsports11?filters[slug][$eq]=${slug}&populate=*`)
  const singleNews = await res.json();
 
  return{
    props : {
      news: singleNews.data[0]
    },
    revalidate:1
  }
}


// export async function getServerSideProps({req}){
//   // const router = useRouter()
//   // const { pid } = router.query
//   // const  {slug}  = context.query;
//   const {token} = parseCookies(req)
//   const res = await fetch(`http://localhost:1337/api/footballsports11?filters[slug][$eq]=name-xxxxxx-252526262&populate=*`)
//   const singleNews = await res.json();
//   console.log("token", token)
//   console.log("SINGLENWS", singleNews.data)
//   return{
//     props : {
//       news: singleNews.data[0]
//     },
//   }
//   // const {token} = parseCookies(req)
//   // return{
//   //     props : { token }
//   // }
// }








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