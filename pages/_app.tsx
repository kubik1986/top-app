import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import React from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>MyTop - наш лучший топ</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}
        />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:type" content="article" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
