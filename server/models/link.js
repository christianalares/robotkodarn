import mongoose, { Schema } from 'mongoose'

const linkSchema = Schema({
    
    title: {
        type: String, required: true
    },
    url: {
        type: String, required: true
    }
    
})

export default mongoose.model('Link', linkSchema)