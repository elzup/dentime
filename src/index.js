// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './config/initialize'
import registerServiceWorker from './config/registerServiceWorker'

const root = document.getElementById('root')
if (root !== null) {
	ReactDOM.render(<App />, root)
	registerServiceWorker()
}
