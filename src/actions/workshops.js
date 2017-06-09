import { routeActions } from 'redux-simple-router'
import axios from 'axios'

export const getWorkshopsByUserId = () => (dispatch) => {

	axios.get('/api/workshopsbyuser', {
		headers: { 'content-type': 'application/json' }
	})
	.then(response => {
		dispatch({
			type: 'SET_WORKSHOPS',
			payload: response.data
		})
	})
	.catch(error => console.log(error))
}

export const addPart = (credentials, id) => (dispatch) => {

	axios.post('/api/workshop/' + id + '/part', credentials, {
		headers: { 'content-type': 'application/json' }
	})
	.then(response => {
		dispatch({
			type: 'SET_PARTS',
			payload: response.data
		})
	})
	.catch(error => console.log(error))
}
