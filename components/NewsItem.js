import React from 'react'
import styles from '../styles/NewsItem.module.css'
import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment/moment'

export default function NewsItem({news}) {
  console.log("NEWS ITEM",news)
  return (
    <div className={styles.news}>
        <div className={styles.img}>
            <Image src={news.attributes.image.data.attributes.url? news.attributes.image.data.attributes.url : "no image"} width={150} height={100} />
        </div>
        <div className={styles.info}>
                
                <span>{moment(news.attributes.date).format("yyyy-MM-DD")} {news.attributes.time}</span> 
                <h3>{news.attributes.name}</h3>
                
        </div>

        <div className={styles.link}>
            <Link legacyBehavior href={`/news/${news.attributes.slug}`}>
                
                <a className='btn'>Read More</a>
            </Link>
        </div>
      
    </div>
  )
}
