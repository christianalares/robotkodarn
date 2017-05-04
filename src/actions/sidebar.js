export const closeSidebar = () => (dispatch) => {
	console.log('action closeSidebar')
	dispatch({
		type: 'SET_SIDEBAR_OPEN',
		payload: false
	})
}

