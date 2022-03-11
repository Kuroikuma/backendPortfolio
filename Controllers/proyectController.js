const Proyect = require('../models/proyectModel')

exports.add = (req, res, next) => {
  const proyect = new Proyect(req.body)

  if (req.files) {
    req.files.map((item) =>
      proyect.imgs.push(`${process.env.HEROKU_URL}${item.filename}`)
    )
  }
  proyect
    .save()
    .then((saveResponse) => {
      res.status(200).json({ message: saveResponse })
    })
    .catch((error) => {
      next(error)
    })
}

exports.show = (req, res, next) => {
  Proyect.find({})
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((error) => next(error))
}

exports.showById = (req, res, next) => {
  const id = req.params.id
  Proyect.findById(id)
    .then((project) => {
      res.status(200).json(project)
    })
    .catch((error) => next(error))
}

exports.deleteById = (req, res, next) => {
  const id = req.params.id
  Proyect.findByIdAndRemove(id)
    .then((project) => {
      res.status(204).send(project)
    })
    .catch((error) => next(error))
}

exports.updateById = (req, res, next) => {
  const id = req.params.id
  const newProjectInfo = req.body

  Proyect.findByIdAndUpdate(id, newProjectInfo)
    .then((project) => {
      res.status(200).send(project)
    })
    .catch((error) => next(error))
}
