import config from 'config'
import CookieAuth from 'hapi-auth-cookie'
import User from '../models/user'

const login = (request, reply) => {
		if (!request.payload.email || !request.payload.password) {
			return reply({message: 'Missing email or password'}).code(401)
		} else {
			User.findOne({email: request.payload.email}, (error, user) => {
				if (error) return reply(error).code(500)

				if (user && request.payload.email === user.email &&
					request.payload.password === user.password) {

					const { email } = request.payload

					console.log({ email })

					request.cookieAuth.set({email})

					console.log( request.cookieAuth.set )
					reply({email}).code(200)
				} else {
					reply({message: 'Wrong email or password'}).code(401)
				}
			})
		}
	
	// NEDAN ÄR JONAS KOD
	// if (request.payload.username === config.get('auth.username') &&
	// 		request.payload.password === config.get('auth.password')) {

	// 		const { username } = request.payload

	// 		request.cookieAuth.set({username})

	// 		reply({username}).code(200)
	// } else {
	// 	reply({message: 'Wrong username or password'}).code(401)
	// }
}

const logout = (request, reply) => {
	request.cookieAuth.clear()
	reply({message: 'auth/logout'})
}

exports.register = (server, options, next) => {
	server.register(CookieAuth, (error) => {
		if (error) throw error

		server.auth.strategy('session', 'cookie', {
			password: config.get('auth.key'),
			isSecure: process.env.NODE_ENV === 'production',
			isHttpOnly: true
		})

		server.route([
			{
				method: 'POST',
				path: '/auth/login',
				config: {
					handler: login,
					auth: {
						mode: 'try',
						strategy: 'session'
					},
					plugins: {
						'hapi-auth-cookie': {
							redirectTo: false
						}
					}
				}
			},
			{
				method: 'GET',
				path: '/auth/logout',
				config: {
					handler: logout,
					auth: 'session'
				}
			}
		])
		next()
	})
}

exports.register.attributes = {
	name: 'auth'
}
