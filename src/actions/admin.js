// ----------------------------------------
// signIn, not currently in use
// ----------------------------------------
// export const signIn = (credentials, path) => (dispatch) => {
// 	const request = new XMLHttpRequest()
// 	request.open('POST', '/api/auth', true)
// 	request.setRequestHeader('Content-Type', 'application/json')
// 	request.onload = () => {
// 		if (request.status >= 200 && request.status < 400) {
// 			dispatch(routeActions.push(path))
// 		}
// 	}
// 	request.send(JSON.stringify(credentials))
// }


// ----------------------------------------
// signIn, takes email and hashed input
// ----------------------------------------
export const signIn = (credentials, path) => (dispatch) => {
	const request = new XMLHttpRequest()
	request.open('GET', '/api/users/email/' + credentials.email, true)
	request.setRequestHeader('Content-Type', 'application/json')
	request.onload = () => {
		if (request.status >= 200 && request.status < 400) {
			console.log( request.status )
			// dispatch(routeActions.push(path))
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
	request.open('POST', '/api/users', true)
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

// ----------------------------------------
// getUserByEmail, gets user credentials
// from an email inputed from the component
// ----------------------------------------
// export const getUserByEmail = (email) => (dispatch) => {

// 	const request = new XMLHttpRequest()
// 	request.open('GET', '/api/users/email/' + email.email, true)
// 	request.setRequestHeader('Content-Type', 'application/json')
// 	request.onload = () => {
// 		if (request.status >= 200 && request.status < 400) {
// 			dispatch({
// 				type: 'SET_USER',
// 				payload: JSON.parse(request.response)
// 			})
// 		}
// 		else if (request.status === 401) {
// 			dispatch(routeActions.push('/admin'))
// 		}
// 	}
// 	request.send(JSON.stringify(email))
// }