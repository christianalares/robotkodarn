import { routeActions } from 'redux-simple-router'

export const findWorkshopByPin = (pin) => (dispatch) => {
	const request = new XMLHttpRequest()
	request.open('GET', '/api/workshop/pin/' + pin, true)

	request.onload = () => {
		if (request.status >= 200 && request.status < 400) {
			dispatch({
				type: 'SET_WORKSHOP',
				payload: request.response
			})
		} else {
            dispatch( routeActions.push('/login') )
        }
	}
	
	request.send()
}

export const setUserCode = (setUserCode) => (dispatch) => {
	dispatch({
		type: 'SET_USER_CODE',
		payload: setUserCode
	})
}