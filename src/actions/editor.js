export const changeEditorTab = (userOrOriginal) => (dispatch) => {
	dispatch({
		type: 'SET_EDITOR_TAB',
		payload: userOrOriginal
	})
}

export const compileCode = (codeToCompile, willUpload) => (dispatch) => {
	
	// request.onload = () => {
	// 	if (request.status >= 200 && request.status < 400) {
    //         dispatch({
    //             type: 'SET_COMPILER_RESPONSE',
    //             payload: {
	// 				compilerResponse: JSON.parse(request.response),
	// 				willUpload: willUpload
	// 			}
    //         })
	// 	} else if(request.status === 401) {
	// 		window.alert( JSON.parse(request.response).message )
	// 	}
	// }
	// request.send( JSON.stringify(objToSend) )

	const request = new XMLHttpRequest()
	request.open('POST', '/api/editor', true)
	request.setRequestHeader('Content-Type', 'application/json')


	request.onload = () => {
		console.log( request.response )
	}
	request.send()
}

export const uploadCode = (compiledCode) => (dispatch) => {
	const request = new XMLHttpRequest()
	request.open('POST', '/api/usb', true)
	request.setRequestHeader('Content-Type', 'application/json')

	request.onload = () => {
		console.log( request )
		if (request.status >= 200 && request.status < 400) {
            dispatch({
                type: 'SET_CONSOLE_OUTPUT',
                payload: {
					type: 'success',
					heading: 'Lyckat',
					message: 'Kod uppladdad till robot'
				}
            })
		} else {
			dispatch({
                type: 'SET_CONSOLE_OUTPUT',
                payload: {
					type: 'error',
					heading: 'Fel från kompilator',
					message: JSON.parse(request.response).error
				}
            })
		}
	}
	request.send( JSON.stringify(compiledCode) )
}

export const setConsoleOutput = (output) => (dispatch) => {
	dispatch({
		type: 'SET_CONSOLE_OUTPUT',
		payload: { type: output.type, heading: output.heading, message: output.message }
	})
}

export const clearConsole = () => (dispatch) => {
	dispatch({
		type: 'CLEAR_CONSOLE'
	})
}

export const pingForUSBConnection = () => (dispatch) => {
	const request = new XMLHttpRequest()
	request.open('GET', '/api/usb', true)
	request.setRequestHeader('Content-Type', 'application/json')

	request.onload = () => {
		if (request.status >= 200 && request.status < 400) {
			dispatch({
				type: 'SET_CONNECTED_ROBOT',
				payload: request.response
			})
		} else {
			dispatch({
				type: 'SET_CONNECTED_ROBOT',
				payload: null
			})
		}
	}
	request.send()
}

export const setActivePartIndex = (index) => (dispatch) => {
	dispatch({
		type: 'SET_ACTIVE_PART_INDEX',
		payload: index
	})
}