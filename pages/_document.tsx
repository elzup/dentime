import NextDocument, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from 'next/document'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'
import React from 'react'

class Document extends NextDocument<{}> {
	static async getInitialProps(ctx: DocumentContext) {
		const styledComponentSheets = new StyledComponentSheets()
		const originalRenderPage = ctx.renderPage

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props =>
						styledComponentSheets.collectStyles(<App {...props} />),
				})

			const initialProps = await NextDocument.getInitialProps(ctx)

			return {
				...initialProps,
				styles: [
					...React.Children.toArray(initialProps.styles),
					styledComponentSheets.getStyleElement(),
				],
			}
		} finally {
			styledComponentSheets.seal()
		}
	}

	render() {
		return (
			<Html lang={'ja'}>
				<Head>
					<link
						rel="icon"
						type="image/png"
						href="/static/icon-4x.png"
						sizes="192x192"
					/>
					<link rel="manifest" href="/static/manifest.json" />
					<link rel="shortcut icon" href="/static/icon.png" />
					<link rel="apple-touch-icon" href="/static/icon-2x.png" />

					<meta charSet="utf-8" />
					<meta name="theme-color" content="#001a3c" />
					<meta name="robots" content="noindex,nofollow,noarchive" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default Document
