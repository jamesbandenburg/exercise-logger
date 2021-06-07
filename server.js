const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const path = require('path')

const app = express()

connectDB();

app.use(express.json({ extended: true }))
app.use(cors())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next();
  })
app.use('/api/activities', require('./routes/Activities'))
app.use('/api/users', require('./routes/Users'))




const PORT = process.env.PORT || 5000

app.listen(PORT , () => {
    console.log(`Server started on port ${PORT}`)
})