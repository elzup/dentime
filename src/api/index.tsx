
import axios from 'axios'
import type { TimeResponse } from '../types'

const DATA_URL = (process.env.PUBLIC_URL || '') + '/time.json'

export async function loadData(): Promise<TimeResponse> {
	const res = await axios.get(DATA_URL)

	return res.data
}
