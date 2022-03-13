const express = require('express')
const router = express.Router()

const skillController = require('../Controllers/skillController')
const certController = require('../Controllers/certController')
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
  ////////Cert/////////////
  router.post('/api/cert', certController.add)
  router.get('/api/cert/pagination', certController.pagination)
  router.get('/api/cert', certController.show)
  router.get('/api/cert/all', certController.showAll)
  router.delete('/api/cert/:id', certController.deleteById)
  return router
}
