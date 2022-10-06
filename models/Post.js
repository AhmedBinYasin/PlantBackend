const mongoose = require('mongoose')
const { Schema } = mongoose



const postDataSchema = new Schema({
    UploadsRelation: {
        type: String,
        required: true,
    },
    Type: {
        type: String,
        required: true,
    },
    Title: {
        type: String,
        required: true,
    },
    TextContent: {
        type: String,
        default: '',
    },
    FileContent: {
        type: String,
        default: '',
    },
    Fields: [],
    Activity: {
        type: Boolean,
        default: false,
    },
    publicAck: {
        type: Boolean,
        required: true
    },
    saveAck: {
        type: Boolean,
        required: true
    },
})

const Post = mongoose.model('postData', postDataSchema)
module.exports = Post