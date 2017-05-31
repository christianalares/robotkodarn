import { routeActions } from 'redux-simple-router'
import axios from 'axios'

// ----------------------------------------
// signIn, takes email and hashed input
// ----------------------------------------
export const signIn = (credentials, path) => (dispatch) => {
	const data = JSON.stringify(credentials)

	axios.post('/auth/signIn', data, {
		headers: { 'content-type': 'application/json' }
	})
	.then(response => dispatch(routeActions.push(path)))
	.catch(error => console.log(error))
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
	const data = JSON.stringify(credentials)

	axios.post('/api/user', data, {
		headers: { 'content-type': 'application/json' }
	})
	.then(response => window.alert('User is registered'))
	.catch(error => {
		console.log(error)
		dispatch(routeActions.push('/admin'))
	})
}