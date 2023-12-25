const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { User } = require("../models/register");
const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const auth = require("../middleware/auth");
const joiPassword = Joi.extend(joiPasswordExtendCore);

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -cPassword");
  if (!user) {
    res.status(400).send("invalid user");
    return;
  }
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).send("invaid email ");
    return;
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  console.log(validPass);
  if (!validPass) {
    res.status(400).send("invaid password ");
    return;
  }

  const token = user.generateAuthTokens();
  res.status(200).send(token);
  console.log(token);
});

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: joiPassword.string().required(),
  });

  return schema.validate(user);
}

module.exports = router;
