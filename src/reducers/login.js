import { handleActions } from 'redux-actions'

export default handleActions({
	SET_WORKSHOP: (state, action) => {
		return ({
			...state,
			currentWorkshop: action.payload
		})
	}
}, {
	currentWorkshop: null
})
