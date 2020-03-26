import React from 'react'

import renderer from 'react-test-renderer'
import Board from '../'
import periods from './testdata'

import 'jest-styled-components'

test('renders correctly', () => {
	const tree = renderer.create(<Board periods={periods} />).toJSON()

	expect(tree).toMatchSnapshot()
})
