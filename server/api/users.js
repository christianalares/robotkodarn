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

const addUser = (request, reply) => {
	console.log( request.payload )
	User.findOne({email: request.payload.email}, (error, user) => {
		if (error) return reply(error).code(500)


		if (user) return reply({error: 'User already exists'}).code(400) //HUR GÖR MAN?

		user = new User(request.payload)
		user.save(error => {
			if (error) return reply({error: error.message}).code(400)

			return reply(user).code(200)
		})
	})
}

const getSalt = (request, reply) => {
	User.find({email: request.params.email}, (error, user) => {
	if (error) return reply(error).code(500)

	return reply(user).code(200)
  })
}

// const getSalt = (request, reply) => {
// 	console.log( request.payload.email )
	// User.findOne({email: request.payload.email}, (error, user) => {
	// 	if (error) return reply(error).code(500)


	// 	if (user) return reply({error: 'User already exists'}).code(400) //HUR GÖR MAN?

	// 	user = new User(request.payload)
	// 	user.save(error => {
	// 		if (error) return reply({error: error.message}).code(400)

	// 		return reply(user).code(200)
	// 	})
	// })
// }


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
	},
	{
		method: 'POST',
		path: '/api/users',
		config: {
			handler: addUser
		}
	},
	{
		method: 'GET',
		path: '/api/users/email/{email}',
		config: {
			handler: getSalt,
			// auth: 'session'
		}
	}

])
	next()
}

exports.register.attributes = {
	name: 'user'
}

