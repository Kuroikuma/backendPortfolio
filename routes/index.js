const express = require('express')
const router = express.Router()

const skillController = require('../Controllers/skillController')
const proyectController = require('../Controllers/proyectController')

module.exports = function () {
  /// /Proyectos///////////////////////
  router.post('/proyect', proyectController.fileUpload, proyectController.add)
  router.get('/proyect', proyectController.show)
  /// //////Skilll////////
  router.post('/skill', skillController.fileUpload, skillController.add)
  router.get('/skill', skillController.show)
  router.get('/skill/:id', skillController.showById)
  router.delete('/skill/:id', skillController.deleteById)
  router.put(
    '/skill/:id',
    skillController.fileUpload,
    skillController.updateById
  )
  return router
}
