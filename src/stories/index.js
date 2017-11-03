import React from 'react'
import moment from 'moment'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import Header from '../components/Header'
import Clock from '../components/Clock'
import '../initialize'

storiesOf('Header', module).add('normal', () => <Header />)

storiesOf('Clock', module)
	.add('00:00', () => <Clock now={moment({ h: 0, m: 0 })} />)
	.add('12:59', () => <Clock now={moment({ h: 12, m: 59 })} />)
	.add('09:09', () => <Clock now={moment({ h: 9, m: 9 })} />)
