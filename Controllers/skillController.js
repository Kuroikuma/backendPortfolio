const multer = require("multer");
const multerConfig = require("../utils/multerConfig");
const { appConfig } = require("../config");

const Skill = require("../models/skillModel");

const upload = multer(multerConfig).single("img");

exports.fileUpload = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ mensaje: error });
    }
    return next();
  });
};

exports.add = (req, res, next) => {
  const skill = new Skill(req.body);

  const { host, port } = appConfig;

  if (req.file && req.file.filename) {
    skill.img = `${host}:${port}/${req.file.filename}`;
  }

  skill
    .save()
    .then((saveResponse) => {
      res.status(200).json({ mensaje: saveResponse });
    })
    .catch((error) => {
      next(error);
    });
};

exports.show = (req, res, next) => {
  Skill.find({})
    .then((respuesta) => {
      res.status(200).json({ respuesta });
    })
    .catch((error) => next(error));
};

exports.showById = (req, res, next) => {
  const id = req.params.id;
  Skill.findById(id)
    .then((skill) => {
      res.status(200).json({ skill });
    })
    .catch((error) => next(error));
};

exports.deleteById = (req, res, next) => {
  const id = req.params.id;
  Skill.findByIdAndRemove(id)
    .then((skill) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
};

exports.updateById = (req, res, next) => {
  const id = req.params.id;
  const skill = req.body;
  const { host, port } = appConfig;
  if (req.file && req.file.filename) {
    skill.img = `${host}:${port}/${req.file.filename}`;
  } else {
    Skill.findById(id)
      .then((response) => {
        skill.img = response.img;
      })
      .catch((error) => {
        next(error);
      });
  }
  const newSkillInfo = { img: skill.img, name: skill.name };
  Skill.findByIdAndUpdate(id, newSkillInfo)
    .then((skill) => {
      res.status(200).send(skill);
    })
    .catch((error) => next(error));
};
