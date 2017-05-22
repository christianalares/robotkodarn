import config from 'config'
import CookieAuth from 'hapi-auth-cookie'
import User from '../models/user'
import { routeActions } from 'redux-simple-router'

// ----------------------------------------
// Get one user with the email [POST]
// ----------------------------------------
const signIn = (request, reply) => {
	if (!request.payload.email || !request.payload.password) {
		return reply({message: 'Missing email or password'}).code(401)
	}

	User.findOne({email: request.payload.email}, (error, user) => {
		if (error) return reply(error).code(500)

		if(user) {
			// Email found, check if password is correct
			if(user.password === request.payload.password) {

				const user = request.payload
				request.cookieAuth.set({user}) // Set user cookie
				console.log(user)

				return reply({message: 'Logged in'}).code(200)
			} else {
				return reply({message: 'Wrong username and/or password'}).code(401)
			}
		} else {
			// Email doesn't exist in db
			reply({message: 'Wrong username and/or password'}).code(401)
		}
	})
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
				path: '/auth/signIn',
				config: {
					handler: signIn,
					auth: {
						mode: 'try',
						strategy: 'session',
					},
					plugins: {
						'hapi-auth-cookie': {
							redirectTo: false
						}
					}
					// auth: 'session'
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