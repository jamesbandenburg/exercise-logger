const mongoose = require('mongoose');
const config = require('config')

const db = config.get('MongoURI');

const connectDB = async () => {
    try {
        mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
        })
    console.log("MongoDB Connected")
    } catch (err) {
        process.exit(1)
    }
}

module.exports = connectDB
