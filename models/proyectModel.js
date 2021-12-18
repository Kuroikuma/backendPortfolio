const { Schema, model } = require('mongoose')

const proyectSchema = new Schema({
  name: String,
  descripcion: String,
  imgs: [String]
})

proyectSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Proyect = model('Proyect', proyectSchema)

module.exports = Proyect
