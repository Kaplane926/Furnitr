function renderListings(){

  $.ajax('/api/items/items', { method: 'POST' })
  .then(function(data){
    let html = ""
    let id = 1
    for(row of data.rows){
      if(row.seller_id === 2){
      html += `<tr>
      `
      html += `<td class="item-img"><img src="${row.image_url}"></td>
      `
      html += `<td class="item-title">${row.title}</td>
      `
      html += `<td class="item-desc">${row.description}</td>
      `
      html += `<td><button class="remove" data-id = "${row.id}">Remove</button></td>`

      html += `<td><button class="sold" data-id = "${row.id}">Sold</button></td>
     `
      html += `<td><button class="msg" data-id = "${row.id}">Messages</button></td>
      </tr>`

    id ++
      }
    }

    $('#seller-list').html(html)
  })
  .then(function(){
    $('.dislike').click(function(){
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
