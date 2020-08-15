const Product = require('../Models/Product')
const { errorHandler } = require('../Helpers/dbErrorHandler')
const formidable = require('formidable')
const _ = require('lodash')
const fs  = require('fs')

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    //Manter extenção
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({ error: 'Image could not be uploaded'})
        }
        let product = new Product(fields)
        //Populate photo
        if (files.photo) {
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({ error: errorHandler(err)})
            }
            res.json(result)
        })
    })

}