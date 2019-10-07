// @flow
import React from 'react'
import Board from '.'
import renderer from 'react-test-renderer'
import periods from './testdata'
import 'moment/locale/ja'

it('renders correctly', () => {
	const tree = renderer.create(<Board periods={periods} />).toJSON()

	expect(tree).toMatchSnapshot()
})
