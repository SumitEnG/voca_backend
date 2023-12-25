const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const flashCardSchema = new mongoose.Schema({
  vocab: {
    type: String,
    required: true,
    unique: true,
  },
  meaning: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Flashcard = new mongoose.model("Flashcard", flashCardSchema);

function validateFlashcard(flashcard) {
  const schema = Joi.object({
    vocab: Joi.string().required(),
    meaning: Joi.string().required(),
    userId: Joi.objectId().required(),
  });
  return schema.validate(flashcard);
}

module.exports.Flashcard = Flashcard;
module.exports.validateFlashcard = validateFlashcard;
