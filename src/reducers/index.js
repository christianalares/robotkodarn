import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import items from './items'
import sidebar from './sidebar'

export default combineReducers({
	routeReducer,
	items,
	sidebar
})
