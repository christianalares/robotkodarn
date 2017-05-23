import { routeActions } from 'redux-simple-router'

export const receiveItems = () => (dispatch) => {
	const request = new XMLHttpRequest()
	request.open('GET', '/api/items', true)
	request.onload = () => {
		if (request.status >= 200 && request.status < 400) {
			dispatch({
				type: 'RECEIVE_ITEMS',
				payload: JSON.parse(request.responseText)
			})
		}
		else if (request.status === 401) {
			dispatch(routeActions.push('/admin'))
		}
	}
	request.send()
}