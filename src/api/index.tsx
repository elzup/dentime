import fetch from 'unfetch'

export async function fetcher<JSON = unknown>(url: string): Promise<JSON> {
	const r = await fetch(url)

	return r.json()
}
