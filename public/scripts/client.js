


/*const likeItem = function(){
  const values = []
  const queryString = `
  INSERT INTO favourites (user_id, item_id)
  VALUES ($1, $2);
  `
}*/
const getData = function(data){

}

$(document).ready(function(){

  $('#Right').click(function(){
    //alert("You like this item")
    $.ajax('/api/furnitr', { method: 'POST' })
    .then(function(data){

      $('.furniture_image').html(`<img src="${data.rows[0].image_url}"></img>`)
      //console.log("data: ", data)

      console.log("data: ", data.rows[0].image_url)

      console.log('ajax request called!')
    })
    $.ajax('/api/furnitrFavourite', { method: 'POST' })
    .catch((err)=> console.log(err));

  })

  $('#Left').click(function(){
    alert("You dislike this item")
    $.ajax('/furnitr', { method: 'GET' })
    .then(function(data){
      $('.furniture_image').html(`<img src="/images/sexy_couch_potato.png"></img>`)
      console.log(data)


      console.log('ajax request called!')
    })
  })
})
