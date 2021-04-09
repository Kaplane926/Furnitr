const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post("/", (req, res) => {
    const values = [req.session['user_id'], req.body.title, req.body.price, req.body.description, req.body.photos, req.body.country, req.body.street, req.body.city, req.body.province, req.body.post_code]
    if(req.body.photos){
   db.query(`
    INSERT INTO items (seller_id, title, price, description, image_url, date_posted, country, street, city, province, postal_code, status)
    VALUES ($1, $2, $3, $4, $5, '2020-04-09', $6, $7, $8, $9, $10, 'Available')
    `, values
    )
      .then(data => {
        console.log(data)
        res.redirect('/my_listings')
      })
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({ error: err.message });
      });
    } else{
      res.redirect("/error")
    }

  });
  return router;
  };
