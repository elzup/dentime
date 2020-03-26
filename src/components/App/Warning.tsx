function isNewHost() {
	return (
		typeof window !== 'undefined' && /anozon\.me/.exec(window.location.href)
	)
}
function Warning() {
	if (isNewHost()) {
		return null
	}
	return (
		<div style={{ margin: '8px' }}>
			<a href="//dentime.anozon.me">dentime.anozon.me</a> に移行しました。
			<br />
			アプリの場合は新しいURLから再インストールしてこれまで通り使用できます。
		</div>
	)
}

export default Warning
