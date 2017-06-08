import { routeActions } from 'redux-simple-router'
import axios from 'axios'

export const createWorkshop = (workshop) => (dispatch) => {

	axios.post('/api/workshop', workshop, {
		headers: { 'content-type': 'application/json' }
	})
	.then(console.log(workshop.title + ' added'))
	.catch(error => console.log(error))
}