import {routeActions} from 'redux-simple-router'

export const signIn = (credentials, path) => (dispatch) => {

	const request = new XMLHttpRequest()

	request.open('POST', '/auth/login', true)
	request.setRequestHeader('Content-Type', 'application/json')
	request.onload = () => {
		if (request.status >= 200 && request.status < 400) {
			dispatch(routeActions.push(path))
		}
	}
	console.log('hej')
	request.send(JSON.stringify(credentials))
}