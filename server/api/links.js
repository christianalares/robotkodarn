import Link from '../models/link'
import Workshop from '../models/workshop'

// ----------------------------------------
// Get all links [GET]
// ----------------------------------------
const getLinks = (request, reply) => {
	Workshop.findOne({_id: request.params.id}, (error, foundWorkshop) => {
	if (error) return reply(error).code(500)

	return reply(foundWorkshop.links).code(200)
  })
}

// ----------------------------------------
// Get one link with {id} [GET]
// ----------------------------------------
const getLink = (request, reply) => {
	Workshop.findOne({_id: request.params.wid}, (error, foundWorkshop) => {
	if (error) return reply(error).code(500)

	const link = foundWorkshop.links.filter( (link) => link._id == request.params.lid )[0]

	return reply(link).code(200)
  })
}

// ----------------------------------------
// Add a link [POST]
// ----------------------------------------
const addLink = (request, reply) => {
	Workshop.findOne({_id: request.params.id}, (error, foundWorkshop) => {
		if (error) return reply(error).code(500)

		const link = new Link(request.payload)

		foundWorkshop.links.push(link)

		foundWorkshop.save(error => {
			if (error) return reply({error: error.message}).code(400)
			return reply(foundWorkshop).code(200)			
		})

	})
}

// ----------------------------------------
// Update a link with {id} [PUT]
// ----------------------------------------
const updateLink = (request, reply) => {
	Link.findOne({_id: request.params.id}, (error, foundLink) => {
		if (error) return reply(error).code(500)

		const i = Object.assign(foundLink, request.payload)

		i.save((error, doc) => {
			if (error) return reply({error: error.message}).code(400)

			return reply(doc).code(200)
		})
	})
}

// ----------------------------------------
// Delete a link with {id} [DELETE]
// ----------------------------------------
const deleteLink = (request, reply) => {
	Workshop.findOne({_id: request.params.wid}, (error, foundWorkshop) => {
		if (error) return reply(error).code(500)

		const linkToDelete = foundWorkshop.links.filter( (link) => link._id == request.params.lid )[0]
		foundWorkshop.links.splice( foundWorkshop.links.indexOf(linkToDelete), 1 )

		foundWorkshop.save(error => {
			if (error) return reply({error: error.message}).code(400)

			return reply(foundWorkshop).code(200)
		})
	})
}



exports.register = (server, options, next) => {
	server.route([
		{
			method: 'GET',
			path: '/api/workshop/{id}/links',
			config: {
				handler: getLinks,
				// auth: 'session'
			}
		},
		{
			method: 'GET',
			path: '/api/workshop/{wid}/link/{lid}',
			config: {
				handler: getLink,
				// auth: 'session'
			}
		},
		{
			method: 'POST',
			path: '/api/workshop/{id}/link',
			config: {
				handler: addLink
			}
		},
		{
			method: 'PUT',
			path: '/api/link/{id}',
			config: {
				handler: updateLink
			}
		},
		{
			method: 'DELETE',
			path: '/api/workshop/{wid}/link/{lid}',
			config: {
				handler: deleteLink
			}
		}
	])
	next()
}

exports.register.attributes = {
	name: 'links'
}

