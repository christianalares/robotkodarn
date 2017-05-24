
const isLoggedIn = (request, reply) => {
	console.log('Session cookie read for user: ' + request.auth.credentials.email)
}

exports.register = (server, options, next) => {
	server.route([
	{
		method: 'GET',
		path: '/api/isLoggedIn',
		config: {
			handler: isLoggedIn,
			auth: 'session'
		}
	}
	])

	next()
}

exports.register.attributes = {
	name: 'administrators'
}