// pull data to profile - sample for now

const addProperty = function (property) {
    const queryString = `INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, county)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;`;
  
    const userInput = [
      property.owner_id,
      property.title,
      property.description,
      property.thumbnail_photo_url,
      property.cover_photo_url,
      property.cost_per_night,
      property.parking_spaces,
      property.number_of_bathrooms,
      property.number_of_bedrooms,
      property.country,
      property.county
    ];
    console.log(queryString, userInput)
    return pool.query(queryString, userInput).then((res) => res.rows[0]);
  };
  exports.addProperty = addProperty;

// character limiter

$(document).ready(function() {
    // --- our code goes here ---
    const $text = $("#tweet-text");
    $text.on('keyup', function(e) {
        const $this = $(this)
        const $counter = $("output.counter")
        const tweetLength = 140 - $this.val().length;
        if (tweetLength < 0) {
            $counter.addClass("counter-red");
        } else {
            $counter.removeClass("counter-red")
        }
        $counter.text(tweetLength);
    })
  });

// like item

// dislike item

// check if item is liked or not