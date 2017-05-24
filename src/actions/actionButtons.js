export const compileCode = (code) => (dispatch) => {
	const request = new XMLHttpRequest()
	request.open('POST', 'http://192.168.33.15/hemligt/v1', true)
	request.setRequestHeader('Content-Type', 'application/json')

    var objToSend = {
        files: [{
            filename: 'robotkodarn.ino',
            content: code
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

    // console.log( objToSend )

	request.onload = () => {
        // console.log( JSON.parse(request.response) )
        // console.log( request )


		if (request.status >= 200 && request.status < 400) {

			if( JSON.parse(request.response).success ) {
                console.log( 'koden e fin' )
            } else {
                console.log( 'koden är FUL SOM FAAAN!' )
            }

		} else if(request.status === 401) {
			window.alert( JSON.parse(request.response).message )
		}
	}
	request.send( JSON.stringify(objToSend) )

    // var testing = {
    //     "files": [{
    //         "filename": "fastBlink.ino",
    //         "content": "void setup() {\n    pinMode(LED_BUILTIN, OUTPUT);\n}\n\nvoid loop() {\n    digitalWrite(LED_BUILTIN, HIGH);\n    delay(200);\n    digitalWrite(LED_BUILTIN, LOW);\n    delay(200);\n}"
    //     }],
    //     "libraries": [],
    //     "logging": true,
    //     "format": "hex",
    //     "version": "105",
    //     "build": {
    //         "mcu": "atmega328p",
    //         "f_cpu": "16000000L",
    //         "core": "arduino",
    //         "variant": "standard"
    //     }
    // }

}