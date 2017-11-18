// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './initialize'

const root = document.getElementById('root')
if (root !== null) {
	ReactDOM.render(<App />, root)
}
