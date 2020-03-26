import { NextPage } from 'next'
import App from '../src/components/App'
import Layout from '../src/components/Layout'

const IndexPage: NextPage = () => {
	return (
		<Layout>
			<App />
		</Layout>
	)
}

export default IndexPage
