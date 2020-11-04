import React from 'react'
import { AppProps } from 'next/app'
import 'normalize.css'
import Head from 'next/head'

const description = 'タイムスケジュールを表示します'
const App = ({ Component, pageProps }: AppProps) => (
	<>
		<Head>
			<link
				rel="icon"
				type="image/png"
				href="/static/icon-4x.png"
				sizes="192x192"
			/>
			<link rel="manifest" href="/static/manifest.json" />
			<link rel="shortcut icon" href="/static/icon-1x.png" />
			<link rel="apple-touch-icon" href="/static/icon-2x.png" />

			<meta charSet="utf-8" />
			<meta name="theme-color" content="#001a3c" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="apple-mobile-web-app-capable" content="yes" />
			<meta name="twitter:card" content="summary" />
			<meta property="og:title" content="DenTime" />
			<meta property="og:description" content={description} />
			<meta property="description" content={description} />
			<title>DenTime</title>
		</Head>
		<Component {...pageProps} />
	</>
)

export default App
