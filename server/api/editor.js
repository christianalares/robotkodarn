var avrpizza = require('avr-pizza');

const compileCode = (request, reply) => {
    var pkg = {
        sketch: __dirname + '/blink.ino',
        board: 'uno'
    };

    // console.log( pkg )

    avrpizza.compile(pkg, (error, hex) => {
        console.log(error);
        console.log('------------------------------------------------------------------');
        console.log(hex);
    });
}



exports.register = (server, options, next) => {
	server.route([
	{
		method: 'POST',
		path: '/api/editor',
		config: {
			handler: compileCode,
		}
	}
	])
	next()
}

exports.register.attributes = {
	name: 'editor'
}