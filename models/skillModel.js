const { Schema, model } = require("mongoose");

const skillSchema = new Schema({
  img: String,
  name: String,
});

skillSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Skill = model("Skill", skillSchema);

module.exports = Skill;
