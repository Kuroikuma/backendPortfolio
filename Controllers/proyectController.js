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

exports.show = async (req, res, next) => {
  try {
    const result = await Proyect.find({}).limit(2)
    const response = {
      result: result,
      next: `https://pure-ridge-19998.herokuapp.com/api/project/pagination?offset=${2}&limit=${2}`,
      previous: null,
    }

    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

exports.showById = (req, res, next) => {
  const id = req.params.id
  Proyect.findById(id)
    .then((project) => {
      res.status(200).json(project)
    })
    .catch((error) => next(error))
}

exports.pagination = async (req, res, next) => {
  const offset = parseInt(req.query.offset)
  const limit = parseInt(req.query.limit)

  try {
    const result = await Proyect.find({}).skip(offset).limit(limit)
    const response = {
      result: result,
      next: `https://pure-ridge-19998.herokuapp.com/api/project/pagination?offset=${
        offset + 2
      }&limit=${offset === 8 ? 3 : limit}`,
      previous: `https://pure-ridge-19998.herokuapp.com/api/project/pagination?offset=${
        offset <= 0 ? 0 : offset - 2
      }&limit=${limit}`,
    }

    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
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
