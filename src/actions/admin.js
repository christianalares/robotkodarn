export const signIn = (credentials, path) => (dispatch) => {
	const request = new XMLHttpRequest()
	request.open('POST', '/api/authenticate', true)
	request.setRequestHeader('Content-Type', 'application/json')
	request.onload = () => {
		if (request.status >= 200 && request.status < 400) {
			dispatch(routeActions.push(path))
		}
	}
	request.send(JSON.stringify(credentials))
}