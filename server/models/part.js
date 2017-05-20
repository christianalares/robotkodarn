import mongoose, { Schema } from 'mongoose'

const partSchema = Schema({
    
    title: {
        type: String, required: true
    },
    code: {
        type: String, required: true
    }
    
})

export default mongoose.model('Part', partSchema)