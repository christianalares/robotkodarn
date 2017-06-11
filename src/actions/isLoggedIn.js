import { routeActions } from 'redux-simple-router'
import axios from 'axios'

export const isLoggedIn = (path) => (dispatch) => {

	axios.get('/api/isLoggedIn')
	.then(response => {

		dispatch({
			type: 'IS_LOGGED_IN',
			payload: response.data.credentials.email
		})
		if (path != null) dispatch(routeActions.push(path))
	})
	.catch(error => {
		dispatch(routeActions.push('/admin'))
	})
}