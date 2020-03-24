import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './config/initialize'

const root = document.getElementById('root')

if (root !== null) {
	ReactDOM.render(<App />, root)
}
