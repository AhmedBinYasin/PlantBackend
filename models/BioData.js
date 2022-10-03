const mongoose = require('mongoose')
const { Schema } = mongoose

const bioDataSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        default: '/ProfilePics/alt.png',
    },
    fName: {
        type: String,
        default: '',
    },
    mName: {
        type: String,
        default: '',
    },
    lName: {
        type: String,
        default: '',
    },
    gender: {
        type: String,
        default: 'Male',
    },
    dateOfBirth: {
        type: String,
        default: '',
    },
    address: {
        type: String,
        default: '',
    },
    country: {
        name:{
            type: String,
            default: '',
        },
        isoCode:{
            type: String,
            default: '',
        },
    },
    state: {
        name:{
            type: String,
            default: '',
        },
        isoCode:{
            type: String,
            default: '',
        },
    },
    city: {
        type: String,
        default: '',
    },
    zip: {
        type: String,
        default: '',
    },
    publicAck: {
        type: Boolean,
        default: false,
    },
    saveAck: {
        type: Boolean,
        default: false,
    },
})

const BioData = mongoose.model('bioData', bioDataSchema)
module.exports = BioData
