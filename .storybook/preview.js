import React from 'react'
import { GlobalStyle } from '../src/config/initialize'

export const decorators = [
	(Story) => (
		<>
			<GlobalStyle />
			<Story />
		</>
	),
]
