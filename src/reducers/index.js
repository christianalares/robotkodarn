import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import items from './items'
import sidebar from './sidebar'
import editor from './editor'
import admin from './admin'

export default combineReducers({
	routeReducer,
	items,
	sidebar,
	editor,
	admin
})
