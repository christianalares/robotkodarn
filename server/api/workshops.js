import Workshop from '../models/workshop'

const getWorkshops = (request, reply) => {
	Workshop.find({}, (error, workshops) => {
	if (error) return reply(error).code(500)

	return reply(workshops).code(200)
  })
}

const getWorkshop = (request, reply) => {
	Workshop.find({_id: request.params.id}, (error, workshops) => {
	if (error) return reply(error).code(500)

	return reply(workshops).code(200)
  })
}

const addWorkshop = (request, reply) => {
	console.log('addWorkshop')
}

exports.register = (server, options, next) => {
	server.route([{
		method: 'GET',
		path: '/api/workshops',
		config: {
		handler: getWorkshops,
		// auth: 'session'
		}
	},
	{
		method: 'GET',
		path: '/api/workshops/{id}',
		config: {
		handler: getWorkshop,
		// auth: 'session'
		}
	},
	{
		method: 'POST',
		path: '/api/workshops',
		config: {
		handler: addWorkshop
		}
	}

])
	next()
}

exports.register.attributes = {
	name: 'workshops'
}

