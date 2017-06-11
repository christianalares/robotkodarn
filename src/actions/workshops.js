import { routeActions } from 'redux-simple-router'
import axios from 'axios'

export const createWorkshop = (credentials) => (dispatch) => {

	axios.post('/api/workshop', credentials, {
		headers: { 'content-type': 'application/json' }
	})
	.then(response => {
		dispatch({
			type: 'SET_MESSAGE',
			payload: `Workshopen ${credentials.title} är nu tillagd med pinkoden: ${credentials.pincode}.`
		})
	})
	.catch(error => console.log(error))
}

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
	.then(response => {
		dispatch({
			type: 'SET_MESSAGE',
			payload: `Workshopen ${workshop.title} är nu borttagen.`
		})
	})
	.catch(error => console.log(error))
}

export const addPart = (credentials, workshop) => (dispatch) => {

	axios.post('/api/workshop/' + workshop._id + '/part', credentials, {
		headers: { 'content-type': 'application/json' }
	})
	.then(response => {
		dispatch({
			type: 'SET_PARTS',
			payload: response.data
		})
		dispatch({
			type: 'SET_MESSAGE',
			payload: `Workshopen ${workshop.title} har nu delmomentet ${credentials.title}.`
		})
	})
	.catch(error => console.log(error))
}

export const addLink = (credentials, workshop) => (dispatch) => {

	axios.post('/api/workshop/' + workshop._id + '/link', credentials, {
		headers: { 'content-type': 'application/json' }
	})
	.then(response => {
		dispatch({
			type: 'SET_MESSAGE',
			payload: `Workshopen ${workshop.title} har nu referenslänken ${credentials.title}.`
		})
	})
	.catch(error => console.log(error))
}