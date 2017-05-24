import { routeActions } from 'redux-simple-router'

export const isLoggedIn = () => (dispatch) => {
	const request = new XMLHttpRequest()
	request.open('GET', '/api/isLoggedIn', true)

	request.onload = () => {
		if (request.status >= 200 && request.status < 400) {

			dispatch({
				type: 'IS_LOGGED_IN',
				payload: request.responseText.credentials
			})
		}
		else if (request.status === 401) {
			dispatch(routeActions.push('/admin'))
		}
	}
	
	request.send()
}