function renderListings(){

  $.ajax('/api/items/items', { method: 'POST' })
  .then(function(data){
    let html = ""
    let id = 1
    //const userID = req.session['user_id']
    //console.log("UserID:", userID)
    console.log("data: ", data)

    for(row of data.rows){
      //console.log("seller_ID: ", row.seller_id)


      html += `<tr>
      `
      html += `<td class="item-img"><img src="${row.image_url}"></td>
      `
      html += `<td class="item-title">${row.title}</td>
      `
      html += `<td class="item-desc">${row.description}</td>
      `
      html += `<td><button  id = '${id}' class="remove" data-id = "${row.id}">Remove</button></td>`

      html += `<td><button class="sold" data-id = "${row.id}">Sold</button></td>
     `
      html += `<td>
      <form method="GET" action="/messages/${row.id}"><button type="delete"
          class="msg">Messages</button></form></td>
      </tr>`

    id ++

    }

    $('#seller-list').html(html)
  })
  .then(function(){
    $('.remove').click(function(){
      const buttonId = $(this).attr('id')
      const itemId = $(`#${buttonId}`).data('id')
      alert(buttonId)
      $.ajax(`/api/removeItem/${itemId}`, { method: 'POST' })
      .then(function(){
        renderFavourites()
      })

    })
    $('.sold').click(function(){
      const buttonId = $(this).attr('id')
      const itemId = $(`#${buttonId}`).data('id')
      alert(buttonId)
      $.ajax(`/api/removeItem/${itemId}`, { method: 'POST' })
      .then(function(){
        renderListings()
      })

    })
  })

}

$(document).ready(function(){

  renderListings()

})
