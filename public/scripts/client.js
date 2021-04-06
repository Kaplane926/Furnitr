


/*const likeItem = function(){
  const values = []
  const queryString = `
  INSERT INTO favourites (user_id, item_id)
  VALUES ($1, $2);
  `
}*/
//const getData = function(data){

//}

$(document).ready(function(){
  $.ajax('/api/furnitr', { method: 'POST' })
  .then(function(data){
    $('.item-title').html(`${data.rows[0].title} <b> ${data.rows[0].price} </b>`)
    $('.item-desc').html(`${data.rows[0].description}`)
  })
  $('.like').click(function(){
    console.log("clicked")
    //alert("You like this item")
    $.ajax('/api/furnitr', { method: 'POST' })
    .then(function(data){
      //alert("you like this!")
      //alert(data.rows[0].image_url)
      console.log(data)
      $('.items').html(`<img src="${data.rows[0].image_url}"></img>`)
      //console.log("data: ", data)

      console.log("data: ", data.rows[0].image_url)

      console.log('ajax request called!')
    })
    $.ajax('/api/furnitrFavourite', { method: 'POST' })
    .catch((err)=> console.log(err));

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

