function renderListings(){

  $.ajax('/api/items/items', { method: 'POST' })
  .then(function(data){
    let html = ""
    let id = 1
    //const userID = req.session['user_id']
    //console.log("UserID:", userID)

    for(row of data.rows){
      let itemClass = '';
      let soldBtn = '';
      if (row.status === 'Sold') {
       itemClass = 'grayout';
      } else {
        soldBtn = `<button id='s${id}' class="sold" data-id="${row.id}">Sold</button>`;
      }

      html += `<tr>
      `
      html += `<td class="item-img ${itemClass}"><img src="${row.image_url}"></td>
      `
      html += `<td class="item-title ${itemClass}">${row.title}</td>
      `
      html += `<td class="item-desc ${itemClass}">${row.description}</td>
      `
      html += `<td class="item-${row.status} ${itemClass}">${row.status}</td>
      `
      html += `<td><button id='${id}' class="remove" data-id="${row.id}">Remove</button></td>`

      html += `<td>${soldBtn}</td>
     `
      html += `<td>
      <form method="GET" action="/messages/${row.id}"><button type="delete"
          class="msg">Messages</button></form></td>
      </tr>`

    id ++
      console.log(id)
      console.log(row)
      console.log("itemID", row.id)
    }

    $('#seller-list').html(html)
  })
  .then(function(){
    $('.remove').click(function(){
      const buttonId = $(this).attr('id');
      const itemId = $(`#${buttonId}`).data('id');
      console.log("buttonID: ", buttonId)
      console.log("itemID: ", itemId)
      $.ajax(`/api/removeItem/${itemId}`, { method: 'POST' })
      .then(function(){
        renderListings()
      })

    })
    $('.sold').click(function(){
      const buttonId = $(this).attr('id');
      const itemId = $(`#${buttonId}`).data('id');
      alert(itemId)
      $.ajax(`/api/soldItem/${itemId}`, { method: 'POST' })
      .then(function(){
        renderListings()
      })

    })
  })

}

$(document).ready(function(){

  renderListings()

})
