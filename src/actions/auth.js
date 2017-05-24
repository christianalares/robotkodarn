import {routeActions} from 'redux-simple-router'

export const signOut = (path) => (dispatch) => {
	const request = new XMLHttpRequest()
	request.open('GET', '/auth/logout', true)

	request.onload = () => {
		if (request.status >= 200 && request.status < 400) {
			dispatch(routeActions.push(path))
		}
	}
	
	request.send()
}
