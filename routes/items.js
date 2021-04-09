// app.get("/items", (req, res) => {
//   res.send("items");
// });

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post("/items", (req, res) => {
<<<<<<< HEAD

=======
    //console.log('afbsjd');
>>>>>>> 24c8871bf075ec878b2e8e2549930c40a43745a9
    const userID = req.session['user_id']
    console.log(userID);
    //const values = [1, 1]
    db.query(`
    SELECT * FROM items
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
