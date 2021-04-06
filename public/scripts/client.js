


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

      //$('.furniture_image').html(`<img src="/images/shoe_chair.png"></img>`)
      console.log(data)


      console.log('ajax request called!')
    })

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
