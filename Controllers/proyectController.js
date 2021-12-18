const multer = require("multer");
const multerConfig = require("../utils/multerConfig");
const { appConfig } = require("../config");

const Proyect = require("../models/proyectModel");

const upload = multer(multerConfig).array("imgs");

exports.fileUpload = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ mensaje: error });
    }
    return next();
  });
};

exports.add = (req, res, next) => {
  const proyect = new Proyect(req.body);

  const { host, port } = appConfig;

  if (req.files) {
    req.files.map((item) =>
      proyect.imgs.push(`${host}:${port}/${item.filename}`)
    );
  }
  proyect
    .save()
    .then((saveResponse) => {
      res.status(200).json({ mensaje: saveResponse });
    })
    .catch((error) => {
      next(error);
    });
};
exports.show = (req, res, next) => {
  Proyect.find({})
    .then((respuesta) => {
      res.status(200).json({ respuesta });
    })
    .catch((error) => next(error));
};
