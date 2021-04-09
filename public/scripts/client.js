


/*const likeItem = function(){
  const values = []
  const queryString = `
  INSERT INTO favourites (user_id, item_id)
  VALUES ($1, $2);
  `
}*/
//const getData = function(data){

//}


function fetchItem() {
  $.ajax('/api/furnitr', { method: 'GET' })
  .then(function(data){
    const item = data.rows[0]
    if(item !== undefined){
    $('#content').data('item_id', item.id)
    $('.item-title').html(`${item.title} <span class="price"> $${item.price} </span>`)
    $('.item-desc').html(`${item.description}`)
    $('.items').html(`<img src ="${item.image_url}"></img>`)
    }
    else{
      $('.item-title').html(` <b> </b>`)
      $('.item-desc').html(`Uh oh! You've searched through all the available listings`)
      $('.items').html(`<img src ="/images/uh-oh.png"></img>`)
      $('.like').hide()
      $('.dislike').hide()
    }

  })
};

$(document).ready(function(){
  fetchItem()
  $('.like').click(function(){
    console.log("clicked")
    const itemID = $('#content').data('item_id')
    $.ajax(`/api/furnitrFavourite/${itemID}`, { method: 'POST' })
      .then(function(data) {

        console.log("favourites called! ", data);
        fetchItem();
      })
      .catch(console.log);
  });

  $('.dislike').click(function() {

    const itemID = $('#content').data('item_id');
    $.ajax(`/api/furnitrDislike/${itemID}`, { method: 'POST' })
      .then(function(data) {
        fetchItem();
      })
      .catch(console.log);
  });
});


