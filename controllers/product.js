const Product = require('../models/product')
const { CustomError } = require('../helpers/error-handler')
const roles = require('../helpers/roles')

class ProductController {
  async create (req, res, next) {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      created_by: req.body.createdBy
    })

    try {
      const savedProduct = await product.save()

      return res.status(201).json({
        success: true,
        message: 'Product created successfully.',
        data: { product: savedProduct }
      })
    } catch (error) {
      next(error)
    }
  }

  async getAll (req, res, next) {
    const selectedFields = req.role === roles.admin ? '_id name description price created_by' : '_id name description price'
    try {
      const products = await Product.find({}, selectedFields).exec()
      return res.status(200).json({
        success: true,
        message: 'Products retrieved successfully.',
        data: { products }
      })
    } catch (error) {
      next(error)
    }
  }

  async get (req, res, next) {
    const id = req.params.id
    const selectedFields = req.role === roles.admin ? '_id name description price created_by' : '_id name description price'
    try {
      const product = await Product.findOne({ _id: id }, selectedFields).exec()

      if (!product) {
        throw new CustomError(404, 'product not found')
      }
      return res.status(200).json({
        success: true,
        message: 'Product is retrieved successfully.',
        data: { product }
      })
    } catch (error) {
      next(error)
    }
  }

  async update (req, res, next) {
    const id = req.params.id
    try {
      const product = await Product.findOneAndUpdate({ _id: id }, {
        $set: {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description
        }
      }, { new: true }).exec()

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not be found.',
          data: null
        })
      }
      return res.status(200).json({
        success: true,
        message: 'Product is updated successfully.',
        data: { product }
      })
    } catch (error) {
      next(error)
    }
  }

  async delete (req, res, next) {
    const id = req.params.id
    try {
      await Product.deleteOne({ _id: id }).exec()

      return res.status(200).json({
        success: true,
        message: 'Product is deleted successfully.',
        data: null
      })
    } catch (error) {
      next(error)
    }
  }
}

const productController = new ProductController()
module.exports = productController
