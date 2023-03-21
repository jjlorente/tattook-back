module.exports = (req, res, next) => {
  if (!req.timedout) return next();
  res.status(req.timedout.status).send("Timemout error").end();
}