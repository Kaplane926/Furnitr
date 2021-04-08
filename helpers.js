// pull data to profile - sample for now

const furniture_profile = function (items) {
    const queryString = `INSERT INTO furnitures (seller_id, title, price, description, image, date_posted, date_sold, country, street, city, province, postal_code, zodiac_sign, status)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;`;

    const userInput = [
      items.owner_id,
      items.title,
      items.price,
      items.description,
      items.image,
      items.date_posted,
      items.date_sold,
      items.country,
      items.street,
      items.city,
      items.province,
      items.postal_code,
      items.zodiac_sign,
      items.status
    ];
    console.log(queryString, userInput)
    return pool.query(queryString, userInput).then((res) => res.rows[0]);
  };
  exports.furniture_profile = furniture_profile;

// character limiter

$(document).ready(function() {
    // --- our code goes here ---
    const $text = $("#descrition");
    $text.on('keyup', function(e) {
        const $this = $(this)
        const $counter = $("output.counter")
        const descriptionLength = 280 - $this.val().length;
        if (descriptionLength < 0) {
            $counter.addClass("counter-red");
        } else {
            $counter.removeClass("counter-red")
        }
        $counter.text(descriptionLength);
    })
  });

// like item using https://codepen.io/mapk/pen/ZOQqaQ

$('.favme').click(function() {
	$(this).toggleClass('active');
});

$(".favme").on('click touchstart', function(){
  $(this).toggleClass('is_animating');
});

$(".favme").on('animationend', function(){
  $(this).toggleClass('is_animating');
});

// dislike item using https://codepen.io/mapk/pen/ZOQqaQ

$('.hateme').click(function() {
	$(this).toggleClass('active');
});

$(".hateme").on('click touchstart', function(){
  $(this).toggleClass('is_animating');
});

$(".hateme").on('animationend', function(){
  $(this).toggleClass('is_animating');
});

// check if item is liked or not using https://stackoverflow.com/questions/38139800/add-items-to-favorites-and-see-them-again-when-ever-return-to-website

var chance;
var favorites;
var storage;

$(document).ready(function() {
  chance = new Chance(); // Just for random hash generation
  if (window.Storage != undefined) {
    storage = window.localStorage;
    if (storage.favorites == undefined) {
      favorites = [];
    } else {
      favorites = JSON.parse(storage.favorites);
    }
    updateList();

    $('#fav').click(function() {
      addFavorite(window.location);
      updateList();
    });

    $('#list').on('click', 'li a', function() {
      deleteFavorite($(this).data('id'));
      updateList();
    });
  } else {
    // No support for local storage
    // Fall back to cookies or session based storage
  }
});

function addFavorite(url) {
  favorites.push({
    id: chance.hash({
      length: 15
    }),
    url: url
  });
  storage.setItem('favorites', JSON.stringify(favorites));
}

function deleteFavorite(id) {
  for (var i in favorites) {
    if (favorites[i].id == id) {
      favorites.splice(i, 1);
    }
  }
  storage.setItem('favorites', JSON.stringify(favorites));
}

function updateList() {
  $('#list').empty();
  if (typeof favorites !== 'undefined' && favorites.length > 0) {
    for (var i in favorites) {
      $('#list').append('<li>' +
        favorites[i].url.href +
        '&nbsp;&nbsp;&nbsp;&nbsp;' +
        '<a class="delete" href="#" data-id="' + favorites[i].id + '">delete</a>' +
        '</li>');
    }
  } else {
    $('#list').append('<li>Nothing stored!</li>');
  }
}

function getItem(){
  const query =
  `SELECT title, price, description, image_url
FROM items
LIMIT 1;`

}


// function for search bar

const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let items = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredItems = items.filter((items) => {
        return (
          items.title.toLowerCase().includes(searchString) ||
          items.price.toLowerCase().includes(searchString) ||
          items.description.toLowerCase().includes(searchString) ||
          items.date_posted.toLowerCase().includes(searchString) ||
          items.country.toLowerCase().includes(searchString) ||
          items.street.toLowerCase().includes(searchString) ||
          items.city.toLowerCase().includes(searchString) ||
          items.province.toLowerCase().includes(searchString) ||
          items.postal_code.toLowerCase().includes(searchString) ||
          items.zodiac_sign.toLowerCase().includes(searchString)
        );
    });
    displayItems(filteredCharacters);
});

const loadItems = async () => {
    try {
        const res = await fetch('link to database');
        items = await res.json();
        displayItems(items);
    } catch (err) {
        console.error(err);
    }
};

const displayItems = (items) => {
    const htmlString = items
        .map((item) => {
            return `
            <li class="character">
                <h2>${items.name}</h2>
                <p>House: ${items.description}</p>
                <img src="${items.image}"></img>
            </li>
        `;
        })
        .join('');
    itemsList.innerHTML = htmlString;
};

loadItems();
