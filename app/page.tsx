import { NextPage } from 'next'
import { redirect } from 'next/navigation'

const IndexPage: NextPage = () => {
	redirect('/p/tdu')

	return <div />
}

export default IndexPage
