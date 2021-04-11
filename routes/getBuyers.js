const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.post("/:itemId", (req, res) => {
    console.log("am I here");
    const itemId = req.params.itemId;
    const userId = req.session['user_id'];
    const sql = `
    SELECT u.name, m.item_id, u.id
    FROM messages m
    LEFT JOIN users u ON (m.sender_id = u.id OR m.recipient_id = u.id)
    WHERE m.item_id = $1 AND m.recipient_id = $2 OR m.sender_id = $3 AND u.id != $4
    GROUP BY u.name, m.item_id, u.id
    `;

    db.query(sql, [itemId, userId, userId, userId])
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
