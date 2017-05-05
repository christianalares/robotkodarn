export const closeSidebar = () => (dispatch) => {
	dispatch({
		type: 'SET_SIDEBAR_OPEN',
		payload: false
	})
}

export const openSidebar = () => (dispatch) => {
	dispatch({
		type: 'SET_SIDEBAR_OPEN',
		payload: true
	})
}
