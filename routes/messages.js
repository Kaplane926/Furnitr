const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.post("/:itemId/:contactId", (req, res) => {
    console.log('here');
    const itemId = req.params.itemId;
    const contactId = req.params.contactId;
    const userId = req.session['user_id'];
    const sql = `
    SELECT m.msg_id, m.message, m.msg_created,
      CASE
        WHEN m.sender_id = u.id THEN 'me' ELSE 'contact' END AS msg_class,
      CASE
        WHEN m.sender_id = u.id THEN u.avatar ELSE s.avatar END AS avatar
    FROM users u
    LEFT JOIN messages m ON m.recipient_id = u.id OR m.sender_id = u.id
    LEFT JOIN users s ON m.sender_id = s.id
    WHERE ((u.role = 1 AND (m.recipient_id = u.id OR m.sender_id = u.id))
    OR (u.role = 2 AND (m.recipient_id = $1 OR m.sender_id = $2)))
    AND u.id = $3 AND m.item_id = $4
    `;

    db.query(sql, [contactId, contactId, userId, itemId])
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
