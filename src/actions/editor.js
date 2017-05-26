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

export const compileCode = (codeToCompile) => (dispatch) => {
	const request = new XMLHttpRequest()
	request.open('POST', 'http://192.168.33.15/hemligt/v1', true)
	request.setRequestHeader('Content-Type', 'application/json')

    var objToSend = {
        files: [{
            filename: 'robotkodarn.ino',
            content: codeToCompile
        }],
        libraries: [],
        logging: true,
        format: 'hex',
        version: '105',
        build: {
            mcu: 'atmega328p',
            f_cpu: '16000000L',
            core: 'arduino',
            variant: 'standard'
        }
    }
	request.onload = () => {
		if (request.status >= 200 && request.status < 400) {
            dispatch({
                type: 'SET_COMPILER_RESPONSE',
                payload: JSON.parse(request.response)
            })
		} else if(request.status === 401) {
			window.alert( JSON.parse(request.response).message )
		}
	}
	request.send( JSON.stringify(objToSend) )
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
					key: +new Date(),
					timestamp: new Date(),
					type: 'success',
					heading: 'Lyckat',
					message: 'Kod uppladdad till robot'
				}
            })
		} else {
			dispatch({
                type: 'SET_CONSOLE_OUTPUT',
                payload: {
					key: +new Date(),
					timestamp: new Date(),
					type: 'error',
					heading: 'Fel',
					message: 'Någonting gick fel vid uppladdning till robot'
				}
            })
		}
	}
	request.send( JSON.stringify(compiledCode) )
}

export const setConsoleOutput = (output) => (dispatch) => {
	dispatch({
		type: 'SET_CONSOLE_OUTPUT',
		payload: output
	})
}