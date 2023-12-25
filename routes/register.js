const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validateUser } = require("../models/register");

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).send("user already exist");
    return;
  }

  user = new User(
    _.pick(req.body, [
      "firstName",
      "lastName",
      "email",
      "password",
      "cPassword",
    ])
  );

  if (user.password != user.cPassword) {
    res.status(400).send("password and confirm-password should be match");
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(user.password, salt);
  user.password = hashedPass;

  user.cPassword = user.password;

  await user.save();
  res.status(200).send("user registered successfully");
});

module.exports = router;
