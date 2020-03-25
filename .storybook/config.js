import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { GlobalStyle } from '../src/config/initialize'

function loadStories() {
	require('../src/stories')
}

addDecorator(s => (
	<>
		<GlobalStyle />
		{s()}
	</>
))
configure(loadStories, module)
