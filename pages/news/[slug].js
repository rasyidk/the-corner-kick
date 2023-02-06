import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout';

export default function SigleNews() {
    const router = useRouter();
    console.log("route====>", router);
    return (
    <Layout>
      <h2>Single News</h2>
      <h2>{router.query.slug}</h2>
    </Layout>
  )
}
