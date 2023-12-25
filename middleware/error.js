function error(err, req, res, next) {
  res.status(500).send("something failed", err);
}

module.exports = error;
