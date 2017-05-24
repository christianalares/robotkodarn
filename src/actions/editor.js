export const changeEditorTab = (userOrOriginal) => (dispatch) => {
	dispatch({
		type: 'SET_EDITOR_TAB',
		payload: userOrOriginal
	})
}

export const updateCode = (updatedCode) => (dispatch) => {
	dispatch({
		type: 'UPDATE_CODE',
		payload: updatedCode
	})
}