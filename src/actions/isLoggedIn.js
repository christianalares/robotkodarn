import { routeActions } from 'redux-simple-router'
import axios from 'axios'

export const isLoggedIn = () => (dispatch) => {

	axios.get('/api/isLoggedIn')
	.then(response => {

		dispatch({
			type: 'IS_LOGGED_IN',
			payload: response.data.credentials.email
		})
	})
	.catch(error => {
		console.log(error)
		dispatch(routeActions.push('/admin'))
	})
}