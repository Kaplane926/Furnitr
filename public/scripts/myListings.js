function renderFavourites(){
  $.ajax('/api/items/items', { method: 'POST' })
  .then(function(data){
    let html = ""
    let id = 1
    console.log(data.rows)
    for(row of data.rows){
      if(row.seller_id === 1){
      html += `
      <div class="page-title">My items</div>
      <div class="item-card">
        <div class="liked-items">
        `
      html += `<img src="${row.image_url}">
      `
      html += `<p class="item-title">${row.title}</p>
      `
      html += `<p class="item-desc">${row.description}</p>
      `
      html += `<button id = '${id}' class="dislike" data-id = "${row.id}">
      <i class="fa fa-times" aria-hidden="true"></i>
      </button>
      </div>`

    id ++
      }
    }
    console.log(html)
    $('.content').html(html)
  })
  .then(function(){
    $('.dislike').click(function(){
      const buttonId = $(this).attr('id')
      const itemId = $(`#${buttonId}`).data('id')
      alert(buttonId)
      $.ajax(`/api/removeItem/${itemId}`, { method: 'POST' })
      .then(function(){
        renderFavourites()
      })

    })
  })

}

$(document).ready(function(){

  renderFavourites()

})
