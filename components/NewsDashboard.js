import Link from "next/link";

import React from 'react'
import styles from '../styles/NewsDashboard.module.css'

export default function NewsDashboard({news, handleDelete}) {
  return (
    <div className={styles.news}>
      <h4>
        <Link legacyBehavior href={`/news/${news.slug}`}>
            <a>{news.name}</a>
        </Link>
      </h4>
      <Link href={`/news/edit/${news.id}`}>
        <button className="btn-edit">Edit News</button>
      </Link>

      <button className="btn-delete" onClick={() => handleDelete(news.id)}>
            Delete News
      </button>
    </div>
  )
}
