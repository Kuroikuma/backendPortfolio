const { Schema, model } = require('mongoose')

const certSchema = new Schema({
  image: String,
})

certSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Cert = model('Cert', certSchema)

module.exports = Cert
