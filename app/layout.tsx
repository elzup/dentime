import StyledJsxRegistry from './lib/registry'

export default function RootLayout({ children }: React.PropsWithChildren) {
	return (
		<html lang={'ja'}>
			<body>
				<StyledJsxRegistry>{children}</StyledJsxRegistry>
			</body>
		</html>
	)
}
