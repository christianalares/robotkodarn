import { handleActions } from 'redux-actions'

export default handleActions({
	SET_USER_CODE: (state, action) => {
		return ({
			...state,
			userCode: action.payload
		})
	}
}, {
	userCode: {}
})