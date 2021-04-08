const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.post("/:id", (req, res) => {
    const userID = req.params.id;
    console.log(userID);
    const sql = `
    SELECT m.msg_id, m.message, m.msg_created,
      CASE
        WHEN m.seller_id = u.id THEN 'me' ELSE 'contact' END AS msg_class,
      CASE
        WHEN m.seller_id = u.id THEN u.avatar ELSE s.avatar END AS avatar
    FROM users u
    LEFT JOIN messages m ON m.buyer_id = u.id OR m.seller_id = u.id
    LEFT JOIN users s ON m.seller_id = s.id
    WHERE u.id = $1
    `;

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
