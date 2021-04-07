$(document).ready(function(){

  $.ajax('/api/favourites', { method: 'POST' })
  .then(function(data){
    let html = ""
    for(row of data.rows){
      html += `
        <div class="liked-items">
        `
      html += `<img src="${row.image_url}">
      `
      html += `<p class="item-title">${row.title}</p>
      `
      html += `<p class="item-desc">${row.description}</p>
      `
      html += `<button  class="dislike">
      <i class="fa fa-times" aria-hidden="true"></i>
    </button>
  </div>`
    }
    console.log(html)
    $('.item-card').html(html)
  })

})
