const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Flashcard, validateFlashcard } = require("../models/flashcard");
const { User } = require("../models/register");

router.get("/", async (req, res) => {
  const flashcard = await Flashcard.find();
  res.send(flashcard);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(401).send("invalid user");
  }
  const flashcard = await Flashcard.find({ user: req.params.id });
  res.send(flashcard);
});

router.post("/", async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (!user) {
    res.status(400).send("invalid user");
    return;
  }

  const { error } = validateFlashcard(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const flashcard = new Flashcard({
    vocab: req.body.vocab,
    meaning: req.body.meaning,
    user: req.body.userId,
  });
  await flashcard.save();
  res.send(flashcard);
});

module.exports = router;
