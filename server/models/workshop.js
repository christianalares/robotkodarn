import mongoose, { Schema } from 'mongoose'

const workshopSchema = Schema({
	
	title: {
		type: String, required: true
	},
	pincode: {
		type: String, unique: true, required: true
	},
	_userID: {
		type: Number, unique: true, required: true
	},
	parts: [{
		titel: {
			type: String, required: true
		},
		code: {
			type: String, required: true
		}
	}],
	links: [{
		_linkID: {
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