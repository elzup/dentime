// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './initialize'
if (document === null) {
	ReactDOM.render(<App />, document.getElementById('root'))
}
