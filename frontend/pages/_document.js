// @flow

import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import Style from '../components/Style';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en-US">
        <Head>
          <meta charSet="utf-8" />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />

          <meta name="apple-mobile-web-app-capable" content="yes" />

          <meta name="theme-color" content="#1c2a46" />

          <link
            rel="shortcut icon"
            href={`${process.env.PUBLIC_URL || ''}/favicon.ico`}
          />

          <title>Exposomics - doc.ai</title>

          <meta property="og:url" content={process.env.PUBLIC_URL || ''} />
          <meta
            property="og:image"
            content={`${process.env.PUBLIC_URL ||
              '/'}/static/share-img.png?${process.env.GIT_COMMIT || '0'}`}
          />
          <meta property="og:type" content="article" />
          <meta property="og:title" content="Exposomics - doc.ai" />
          <meta property="fb:app_id" content="138891396834842" />
          <meta
            property="og:description"
            content="doc.ai: Discover things you are exposed to"
          />
          {Style.rewind()}

          {process.env.GOOGLE_MAPS_API_KEY && (
            <script
              type="text/javascript"
              src={`https://maps.googleapis.com/maps/api/js?key=${
                process.env.GOOGLE_MAPS_API_KEY
              }&libraries=places`}
            />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
