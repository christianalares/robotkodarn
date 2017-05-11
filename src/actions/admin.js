export const signIn = (credentials, path) => (dispatch) => {
	const request = new XMLHttpRequest()
	request.open('POST', '/api/auth', true)
	request.setRequestHeader('Content-Type', 'application/json')
	request.onload = () => {
		if (request.status >= 200 && request.status < 400) {
			dispatch(routeActions.push(path))
		}
	}
	request.send(JSON.stringify(credentials))
}

export const toggleUserRegister = (loginOrRegister) => (dispatch) => {
	dispatch({
		type: 'SET_LOGIN_OR_REGISTER',
		payload: loginOrRegister
	})
}