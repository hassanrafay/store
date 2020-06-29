const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const routes = require('./routes')
const { port, dbUrl } = require('./config/config')
const { errorHandler } = require('./helpers/error-handler')

const app = express()
app.use(logger('dev'))

// configure bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// connecting to MongoDB using Mongoose
mongoose.connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
  if (!err) console.log('MongoDB has connected successfully.')
})

// logging DB connection error
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

// app's routes
app.use('/', routes)

// Error handler
app.use((err, req, res, next) => errorHandler(err, req, res, next))

process.on('SIGINT', function () {
  process.exit(1)
})

app.listen(port, () => {
  console.log(`Server is running the port ${port}`)
})
