const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    user: {
        type: String,
    },

    type: {
        type: String,
    },

    date: {
        type: Date,
        required: true,
    },

    duration: {
        type: String,
    },

    location: {
        type: String
    }
})

module.exports = mongoose.model('Activities', Schema)