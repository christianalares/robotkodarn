import mongoose, { Schema } from 'mongoose'

const workshopSchema = Schema({
	
	title: {
		type: String, required: true
	},
	pincode: {
		type: String, unique: true, required: true
	},
	_userId: {
		type: Number, unique: true, required: true
	},
	parts: [{
		_partId: {
			type: Number, unique: true, required: true
		},
		titel: {
			type: String, required: true
		},
		code: {
			type: String, required: true
		}
	}],
	links: [{
		_linkId: {
			type: Number, unique: true, required: true
		},
		title: {
			type: String
		},
		url: {
			type: String
		}
	}]
	
})

export default mongoose.model('Workshop', workshopSchema)