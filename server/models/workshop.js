import mongoose, { Schema } from 'mongoose'

const workshopSchema = Schema({
    
    title: {
        type: String, required: true
    },
    pincode: {
        type: String, unique: true, required: true
    },
    userId: {
        type: String, unique: true, required: true
    },
    parts: [],
    links: []
    
})

export default mongoose.model('Workshop', workshopSchema)