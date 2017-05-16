import Workshop from '../models/workshop'

// ----------------------------------------
// Get all workshops [GET]
// ----------------------------------------
const getWorkshops = (request, reply) => {
	Workshop.find({}, (error, workshops) => {
	if (error) return reply(error).code(500)

	return reply(workshops).code(200)
  })
}

// ----------------------------------------
// Get one workshop with {id} [GET]
// ----------------------------------------
const getWorkshop = (request, reply) => {
	Workshop.find({_id: request.params.id}, (error, workshops) => {
	if (error) return reply(error).code(500)

	return reply(workshops).code(200)
  })
}

// ----------------------------------------
// Add a workshop [POST]
// ----------------------------------------
const addWorkshop = (request, reply) => {
	console.log('addWorkshop')
}

// ----------------------------------------
// Update a workshop with {id} [PUT]
// ----------------------------------------
const updateWorkshop = (request, reply) => {
	console.log('updateWorkshop')
}

// ----------------------------------------
// Delete a workshop with {id} [DELETE]
// ----------------------------------------
const deleteWorkshop = (request, reply) => {
	console.log('deleteWorkshop')
}



exports.register = (server, options, next) => {
	server.route([
		{
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
		},
		{
			method: 'PUT',
			path: '/api/workshops/{id}',
			config: {
				handler: updateWorkshop
			}
		},
		{
			method: 'DELETE',
			path: '/api/workshops/{id}',
			config: {
				handler: deleteWorkshop
			}
		}
	])
	next()
}

exports.register.attributes = {
	name: 'workshops'
}

