// app.get("/items", (req, res) => {
//   res.send("items");
// });

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.redirect('/furnitr')

  });
  return router;
};
