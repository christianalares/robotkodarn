export const closeSidebar = () => (dispatch) => {
	console.log( this )
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