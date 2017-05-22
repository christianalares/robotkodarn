import { handleActions } from 'redux-actions'

export default handleActions({
	IS_LOGGED_IN: (state, action) => ({
		// ...state,
		loggedInUser: action.payload
	})
}, {
	loggedInUser: {}
})