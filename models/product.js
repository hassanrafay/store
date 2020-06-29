const mongoose = require('mongoose')
const Schema = mongoose.Schema

// creating a schema
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  created_by: {
    type: String,
    default: null
  }
}, { versionKey: false })

// creating a model using schema
const Product = mongoose.model('Product', ProductSchema)
module.exports = Product
