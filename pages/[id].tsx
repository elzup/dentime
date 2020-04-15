import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import App from '../src/components/App'
import Layout from '../src/components/Layout'

const IndexPage: NextPage = () => {
	const router = useRouter()

	const queryId = router.query['id']
	const id = typeof queryId === 'string' ? queryId : queryId[0]

	return (
		<Layout>
			<App id={id || 'time'} />
		</Layout>
	)
}

export default IndexPage
