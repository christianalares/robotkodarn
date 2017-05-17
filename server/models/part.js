import mongoose, { Schema } from 'mongoose'

const partSchema = Schema({
    
    titel: {
        type: String, required: true
    },
    code: {
        type: String, required: true
    }
    
})

export default mongoose.model('Part', partSchema)