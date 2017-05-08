import mongoose, { Schema } from 'mongoose'

const workshopSchema = Schema({
	
	titel: {
		type: String, required: true
	},
	pincode: {
		type: String, unique: true, required: true
	},
	userID: {
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
		title: {
			type: String
		},
		url: {
			type: String
		}
	}]
	
})

export default mongoose.model('Workshop', workshopSchema)