const Cert = require('../models/cert')

exports.add = (req, res, next) => {
  const cert = new Cert(req.body)

  cert
    .save()
    .then((saveResponse) => {
      res.status(200).json({ message: saveResponse })
    })
    .catch((error) => {
      next(error)
    })
}

exports.showAll = async (req, res, next) => {
  try {
    const result = await Cert.find({})

    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

exports.show = async (req, res, next) => {
  try {
    const result = await Cert.find({}).limit(6)
    const response = {
      result: result,
      next: `https://pure-ridge-19998.herokuapp.com/api/cert/pagination?offset=${6}&limit=${6}`,
      previous: null,
    }

    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

exports.pagination = async (req, res, next) => {
  const offset = parseInt(req.query.offset)
  const limit = parseInt(req.query.limit)

  try {
    const result = await Cert.find({}).skip(offset).limit(limit)
    const response = {
      result: result,
      next: `https://pure-ridge-19998.herokuapp.com/api/cert/pagination?offset=${
        offset + 6
      }&limit=${limit}`,
      previous: `https://pure-ridge-19998.herokuapp.com/api/cert/pagination?offset=${
        offset <= 0 ? 0 : offset - 6
      }&limit=${limit}`,
    }

    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}
