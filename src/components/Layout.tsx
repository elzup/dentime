import Head from 'next/head'
import { GlobalStyle } from '../config/initialize'
import { WithChild } from '../utils/react'

type Props = {
	reset?: boolean
	title?: string
}

const Layout = ({ children, title = 'Dentime' }: WithChild<Props>) => (
	<div>
		<GlobalStyle />
		<Head>
			<title>{title}</title>
		</Head>
		{children}
	</div>
)

export default Layout
