export const toggleSidebar = (toggleValue) => (dispatch) => {
	dispatch({
		type: 'SET_SIDEBAR_OPEN',
		payload: toggleValue
	})
}