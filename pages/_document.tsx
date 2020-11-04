import NextDocument, {
	DocumentContext,
	Head,
	Html,
	Main,
	NextScript,
} from 'next/document'
import React from 'react'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'

class Document extends NextDocument {
	static async getInitialProps(ctx: DocumentContext) {
		const styledComponentSheets = new StyledComponentSheets()
		const originalRenderPage = ctx.renderPage

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
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
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default Document
