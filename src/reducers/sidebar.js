import { handleActions } from 'redux-actions'

export default handleActions({
	SET_SIDEBAR_OPEN: (state, action) => {
		// console.log( state, action )
		return ({
			...state,
			open: action.payload
		})
	}
}, {
	open: true
})
