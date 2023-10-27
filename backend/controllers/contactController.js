const db = require("../db/models");

const { contact } = db;

function findAll(req, res) {
  contact
    .findAll()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(400).send(err.message || "Could'nt retrieve data")
    );
}

module.exports = { findAll };
