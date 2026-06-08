import { useEffect } from 'react'
import { GlobalStyle } from '../config/initialize'
import { WithChild } from '../utils/react'

type Props = {
	reset?: boolean
	title?: string
}

const Layout = ({ children, title = 'Dentime' }: WithChild<Props>) => {
	useEffect(() => {
		document.title = title
	}, [title])

	return (
		<div>
			<GlobalStyle />
			{children}
		</div>
	)
}

export default Layout
