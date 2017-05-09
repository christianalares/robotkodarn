import User from '../models/user'

const getUsers = (request, reply) => {
	User.find({}, (error, users) => {
	if (error) return reply(error).code(500)

	return reply(users).code(200)
  })
}

const getUser = (request, reply) => {
	User.find({_id: request.params.id}, (error, users) => {
	if (error) return reply(error).code(500)

	return reply(users).code(200)
  })
}

exports.register = (server, options, next) => {
	server.route([{
		method: 'GET',
		path: '/api/users',
		config: {
		handler: getUsers,
		// auth: 'session'
		}
	},
	{
		method: 'GET',
		path: '/api/users/{id}',
		config: {
		handler: getUser,
		// auth: 'session'
		}
	}

])
	next()
}

exports.register.attributes = {
	name: 'user'
}

