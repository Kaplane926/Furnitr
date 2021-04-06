


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
  })
};

$(document).ready(function(){
  fetchItem()
  $('.like').click(function(){
    console.log("clicked")
    const itemID = $('#content').data('item_id')
    $.ajax(`/api/furnitrFavourite/${itemID}`, { method: 'POST' })
    .then(function(data){
      alert("am I working?")
      console.log("favourites called! ", data)
      fetchItem()
    })
    .catch(console.log);
  })

  $('.dislike').click(function(){
    alert("You dislike this item")
    $.ajax('/furnitr', { method: 'GET' })
    .then(function(data){
      $('.items').html(`<img src="/images/sexy_couch_potato.png"></img>`)
      //console.log(data)


      console.log('ajax request called!')
    })
  })
})

