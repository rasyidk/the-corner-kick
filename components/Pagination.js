import React from 'react'
import Link from 'next/link'
export default function Pagination({page,total}) {

    const PER_PAGE = 2;
    const lastPage = Math.ceil(total/ PER_PAGE)
  return (
    <div>
      {
          page > 1 && (
              <Link legacyBehavior href={`/news?page=${page - 1}`}>
                <a className='btn btn-secondary'>Prev</a>
              </Link>
          )
        }

        {
          page < lastPage && (
              <Link legacyBehavior href={`/news?page=${page + 1}`}>
                <a className='btn btn-secondary'>Next</a>
              </Link>
          )
        }
    </div>
  )
}
