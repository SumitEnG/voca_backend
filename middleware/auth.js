const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    res.status(401).send("ACCESS DENIED! ,NO TOKEN PROVIDED");
  }
  try {
    const decoded = await jwt.verify(token, process.env.mySecreteKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("invaalid token");
  }
}

module.exports = auth;
