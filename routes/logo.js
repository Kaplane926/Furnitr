// app.get("/items", (req, res) => {
//   res.send("items");
// });

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    console.log("did it work?")
    res.redirect('/furnitr')

  });
  return router;
};
