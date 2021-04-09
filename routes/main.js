// app.get("/furniture", (req, res) => {
//   res.send("furniture");
// });

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post("/items", (req, res) => {
    db.query(`
    SELECT * FROM items;
    `
    )
      .then(data => {
        console.log(data);
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ error: err.message });
      });

  });
  return router;
};
