// @flow

import type { TimeResponse } from '../types'
import axios from 'axios'

const DATA_URL =
	'https://raw.githubusercontent.com/elzup/db/master/tdu/time.json'

export async function loadData(): Promise<TimeResponse> {
	const res = await axios.get(DATA_URL)
	return res.data
}
