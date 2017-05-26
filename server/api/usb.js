var Avrgirl = require('avrgirl-arduino');

const uploadCode = (request, reply) => {

    // var board = {
    //     name: 'zumo',
    //     baud: 57600,
    //     signature: new Buffer([0x1e, 0x95, 0x87]),
    //     productId: ['0x0036', '0x8036', '0x800c', '0x8036', '0x2300'],
    //     protocol: 'avr109'
    // }

    // Avrgirl.list((err, ports) => {
    //     console.log( ports )
    // })

    var avrgirl = new Avrgirl({
        board: 'uno',
        debug: true,
        manualReset: false
    });


    avrgirl.flash(new Buffer(request.payload), function (error) {
        if (error) {
            return reply({error: error.message}).code(400)
            // console.log( error )
        } else {
            return reply('OK').code(200)
            // console.log( 'done' )
        }
    });

}



exports.register = (server, options, next) => {
	server.route([
	{
		method: 'POST',
		path: '/api/usb',
		config: {
			handler: uploadCode,
		}
	}
	])
	next()
}

exports.register.attributes = {
	name: 'usb'
}

