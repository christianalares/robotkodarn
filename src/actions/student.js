import { routeActions } from 'redux-simple-router'
import axios from 'axios'

export const findWorkshopByPin = (pin) => (dispatch) => {
	axios.get('/api/workshop/pin/' + pin)
	.then(response => {
		dispatch({
			type: 'SET_WORKSHOP',
			payload: request.response
		})
	})
	.catch(error => dispatch( routeActions.push('/login') ))
}