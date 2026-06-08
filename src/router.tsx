import {
	createRootRoute,
	createRoute,
	createRouter,
	Outlet,
	redirect,
} from '@tanstack/react-router'
import { AppPage } from './routes/AppPage'

type StudySearch = { code?: string; name?: string }

const validateSearch = (search: Record<string, unknown>): StudySearch => ({
	code: typeof search.code === 'string' ? search.code : undefined,
	name: typeof search.name === 'string' ? search.name : undefined,
})

const readFavorite = (): string => {
	try {
		const item = localStorage.getItem('favorite')
		return item ? (JSON.parse(item) as string) : '/'
	} catch {
		return '/'
	}
}

const rootRoute = createRootRoute({ component: Outlet })

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	beforeLoad: () => {
		throw redirect({ to: '/p/$pid', params: { pid: 'tdu' } })
	},
})

const favoriteRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/favorite',
	beforeLoad: () => {
		// favorite is a stored path (default '/'); cast to satisfy typed router
		throw redirect({ to: readFavorite() as '/' })
	},
})

const pidRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/p/$pid',
	component: AppPage,
	validateSearch,
})

const bidRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/p/$pid/$bid',
	component: AppPage,
	validateSearch,
})

const routeTree = rootRoute.addChildren([
	indexRoute,
	favoriteRoute,
	pidRoute,
	bidRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}
