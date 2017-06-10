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

export const setSelectedWorkshop = (index) => (dispatch) => {

	dispatch({
		type: 'SET_SELECTED_INDEX',
		payload: index
	})
}

export const removeSelectedWorkshop = (workshop) => (dispatch) => {

	axios.delete('/api/workshop/' + workshop._id, {
		headers: { 'content-type': 'application/json' }
	})
	.then(response => console.log(workshop.title + ' är nu borttagen.'))
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