


/*const likeItem = function(){
  const values = []
  const queryString = `
  INSERT INTO favourites (user_id, item_id)
  VALUES ($1, $2);
  `
}*/
//const getData = function(data){

//}


function fetchItem(){
  $.ajax('/api/furnitr', { method: 'POST' })
  .then(function(data){
    const item = data.rows[0]
    $('#content').data('item_id', item.id)
    $('.item-title').html(`${item.title} <b> ${item.price} </b>`)
    $('.item-desc').html(`${item.description}`)
    $('.items').html(`<img src ="${item.image_url}"></img>`)
  })
};

$(document).ready(function(){
  fetchItem()
  $('.like').click(function(){
    console.log("clicked")
    const itemID = $('#content').data('item_id')
    $.ajax(`/api/furnitrFavourite/${itemID}`, { method: 'POST' })
    .then(function(data){

      console.log("favourites called! ", data)
      fetchItem()
    })
    .catch(console.log);
  })

  $('.dislike').click(function(){

    const itemID = $('#content').data('item_id')
    $.ajax(`/api/furnitrDislike/${itemID}`, { method: 'POST' })
    .then(function(data){

      console.log("dislikes called! ", data)
      fetchItem()
    })
    .catch(console.log);
  })
})


