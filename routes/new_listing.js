// app.get("/new_listing", (req, res) => {
//   res.send("new_listing");
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
        //const users = data.rows;
        //res.json({ users });
        console.log(data)
        res.send(data)
      })
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({ error: err.message });
      });

  });
  return router;
};
