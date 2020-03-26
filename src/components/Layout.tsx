import * as React from 'react'
import Head from 'next/head'
import { GlobalStyle } from '../config/initialize'

type Props = {
	reset?: boolean
	title?: string
}

const Layout: React.FunctionComponent<Props> = ({
	children,
	title = 'Dentime',
}) => (
	<div>
		<GlobalStyle />
		<Head>
			<title>{title}</title>
		</Head>
		{children}
	</div>
)

export default Layout
