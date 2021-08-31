const error = (err, _req, res, _next) => {
  if (err.status === 400) {
    return res.status(400)
      .json({ message: err.message });
  }

  if (err.status === 409) {
    return res.status(409)
      .json({ message: err.message });
  }

  if (err.status === 401) {
    return res.status(401)
      .json({ message: err.message });
  }

  if (err.status === 404) {
    return res.status(404)
      .json({ message: err.message });
  }
};

module.exports = error;
