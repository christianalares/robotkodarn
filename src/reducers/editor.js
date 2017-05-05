import { handleActions } from 'redux-actions'

export default handleActions({
	SET_EDITOR_TAB: (state, action) => {
		console.log( state, action )

		return ({
			...state,
			activeTab: action.payload
		})
	}
}, {
	activeTab: 'user'
})
