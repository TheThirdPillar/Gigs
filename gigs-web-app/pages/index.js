import Head from 'next/head'
import Link from 'next/link'

import DefaultLayout from '../layout/DefaultLayout'

export default function Home() {
  return (
    <DefaultLayout>
      <Head>
        <title>Gigs 1.0</title>
      </Head>
    </DefaultLayout>
  )
}
