const mongoose = require('mongoose')
const roles = require('../helpers/roles')
const Schema = mongoose.Schema

// creating a schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  role: {
    type: String,
    default: roles.client
  }
}, { versionKey: false })

// creating a model using schema
const User = mongoose.model('User', UserSchema)
module.exports = User
