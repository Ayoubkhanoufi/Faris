import React from 'react';
import '../styles/globals.css'
import './assets/css/antd.css'

import '../styles/style.css';
import Head from 'next/head'
import Layout from '../comps/Layout'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <title>Untitled</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )

}

export default MyApp
