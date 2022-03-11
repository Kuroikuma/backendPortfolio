const express = require('express')
const router = express.Router()

const skillController = require('../Controllers/skillController')
const proyectController = require('../Controllers/proyectController')

module.exports = function () {
  /// /Projects///////////////////////
  router.post('/api/project', proyectController.add)
  router.get('/api/project/pagination', proyectController.pagination)
  router.get('/api/project', proyectController.show)
  router.get('/api/project/:id', proyectController.showById)
  router.put('/api/project/:id', proyectController.updateById)
  router.delete('/api/project/:id', proyectController.deleteById)
  /// //////Skill////////
  router.post('/api/skill', skillController.add)
  router.get('/api/skill', skillController.show)
  router.get('/api/skill/:id', skillController.showById)
  router.delete('/api/skill/:id', skillController.deleteById)
  router.put('/api/skill/:id', skillController.updateById)
  return router
}
