const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post("/", (req, res) => {
    //console.log('afbsjd');

    const values = [req.body.title, req.body.price, req.body.description, req.body.photos, req.body.country, req.body.street, req.body.city, req.body.province, req.body.post_code]
    //const date = moment().format('l');
   db.query(`
    INSERT INTO items (seller_id, title, price, description, image_url, date_posted, country, street, city, province, postal_code, status)
    VALUES (1, $1, $2, $3, $4, '2020-09-09', $5, $6, $7, $8, $9, 'Available')
    `, values
    )
      .then(data => {
        //const users = data.rows;
        //res.json({ users });
        console.log(data)
        res.redirect('/my_listings')
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
