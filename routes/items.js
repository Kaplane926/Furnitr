// app.get("/items", (req, res) => {
//   res.send("items");
// });

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post("/items", (req, res) => {
    //console.log('afbsjd');
    const userID = req.session['user_id']
    //const values = [1, 1]
    db.query(`
    SELECT items.* FROM items
    JOIN users ON users.id = seller_id
    WHERE seller_id = ${userID}
    ;

    `
    )
      .then(data => {
        //const users = data.rows;
        //res.json({ users });
        //console.log(data)
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
