var Avrgirl = require('avrgirl-arduino');

const testUSB = (request, reply) => {

    var avrgirl = new Avrgirl({
        board: 'uno',
        debug: true,
        manualReset: false
    });

    // console.log( avrgirl )

    avrgirl.flash(__dirname + '/blink.hex.hex', function (error) {
        if (error) {
            // return reply(error).code(200)
            console.log( error )
        } else {
            // return reply('done').code(200)
            console.log( 'done' )
        }
    });
}



exports.register = (server, options, next) => {
	server.route([
		{
			method: 'GET',
			path: '/api/usb',
			config: {
				handler: testUSB,
			}
		}
	])
	next()
}

exports.register.attributes = {
	name: 'usb'
}

