var Avrgirl = require('avrgirl-arduino');

const testUSB = (request, reply) => {

    // var board = {
    //     name: 'zumo',
    //     baud: 57600,
    //     signature: new Buffer([0x1e, 0x95, 0x87]),
    //     productId: ['0x0036', '0x8036', '0x800c', '0x8036', '0x2300'],
    //     protocol: 'avr109'
    // }

    var avrgirl = new Avrgirl({
        board: 'leonardo',
        debug: true,
        manualReset: true
    });

    // Avrgirl.list((err, ports) => {
    //     console.log( ports )
    // })

    avrgirl.flash(__dirname + '/sensorer.hex', function (error) {
        if (error) {
            console.log( error )
        } else {
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

