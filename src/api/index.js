// @flow

import type { TimeResponse } from '../types'
import axios from 'axios'

const DATA_URL = '/time.json'

export async function loadData(): Promise<TimeResponse> {
	const res = await axios.get(DATA_URL)
	return res.data
}
