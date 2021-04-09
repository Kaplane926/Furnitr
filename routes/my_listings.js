const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post("/", (req, res) => {
    //const values = [1, 1]
    db.query(`
    SELECT * FROM items
    LIMIT 1;
    `
    )
      .then(data => {
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

