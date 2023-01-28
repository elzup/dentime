'use client'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

type Props = { path: string }
export const Redirect = ({ path }: Props) => {
	useEffect(() => {
		redirect(path)
	}, [path])
	return <div />
}
