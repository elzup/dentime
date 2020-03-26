import styled from 'styled-components'
import Clock from '../Clock'

const Row = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 10px;
`

const SideBlock = styled.div`
	width: 30px;
	padding: 10px 15px 0;
	text-align: center;
`

const Link = styled.a`
	color: #a6ccff;
	text-decoration: none;
`

const Footer = () => (
	<Row>
		<SideBlock>
			<Link href="https://github.com/elzup/dentime">{'</>'}</Link>
		</SideBlock>
		<Clock />
		<SideBlock>
			<Link href="https://elzup.com">{"'ω'"}</Link>
		</SideBlock>
	</Row>
)

export default Footer
