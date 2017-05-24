import { routeActions } from 'redux-simple-router'

// ----------------------------------------
// signIn, takes email and hashed input
// ----------------------------------------
export const signIn = (credentials, path) => (dispatch) => {
	const request = new XMLHttpRequest()
	request.open('POST', '/auth/signIn', true)
	request.setRequestHeader('Content-Type', 'application/json')

	request.onload = () => {
		if (request.status >= 200 && request.status < 400) {
			dispatch(routeActions.push(path))
		} else if(request.status === 401) {
			window.alert( JSON.parse(request.response).message )
		}
	}

	request.send(JSON.stringify(credentials))
}

// ----------------------------------------
// toggleUserRegister, toggle the form
// betweet login or registration
// ----------------------------------------
export const toggleUserRegister = (loginOrRegister) => (dispatch) => {
	dispatch({
		type: 'SET_LOGIN_OR_REGISTER',
		payload: loginOrRegister
	})
}

// ----------------------------------------
// registerUser, takes the credentials
// from the component (hashed pass, name and email)
// and posts this to the server
// ----------------------------------------
export const registerUser = (credentials) => (dispatch) => {
	credentials.admin = false

	const request = new XMLHttpRequest()
	request.open('POST', '/api/user', true)
	request.setRequestHeader('Content-Type', 'application/json')

	request.onload = () => {
		if (request.status >= 200 && request.status < 400) {
			window.alert('User is registered')
		}
		else if (request.status === 401) {
			dispatch(routeActions.push('/admin'))
		}
	}
	
	request.send(JSON.stringify(credentials))
}