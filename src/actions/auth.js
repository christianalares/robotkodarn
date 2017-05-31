import {routeActions} from 'redux-simple-router'
import axios from 'axios'

export const signOut = (path) => (dispatch) => {

	axios.get('/auth/logout')
	.then(response => dispatch(routeActions.push(path)))
	.catch(error => console.log(error))
}