const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.post("/:id", (req, res) => {
    console.log(req.body);
    const userID = req.params.id;
    console.log(userID);
    const sql = `
    INSERT INTO messages (recipient_id, sender_id, item_id, message, msg_created)
    VALUES (1, ${userID})`

    db.query(sql, [userID])
      .then(data => {
        console.log('then');
        console.log(data);
        res.send(data);
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
