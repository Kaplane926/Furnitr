function renderFavourites() {
  $.ajax('/api/favourites', { method: 'POST' })
    .then(function(data) {
      let html = "";
      let id = 1;
      for (row of data.rows) {

        html += `<tr>
      `;
        html += `<td class="item-img2"><img src="${row.image_url}"></td>
      `;
        html += `<td class="item-title">${row.title}</td>
      `;
        html += `<td class="item-desc">${row.description}</td>
      `;
        html += `<td><button id="${id}" class="remove" data-id="${row.id}">Remove</button></td>`;

      html += `<td>
      <form method="GET" action="/messages/${row.id}"><button type="delete"
          class="msg">Messages</button></form></td>
      </tr>`

    id ++
    }
    console.log(html)
    $('#seller-list').html(html)
  })
  .then(function(){
    $('.remove').click(function(){
      const buttonId = $(this).attr('id')
      const itemId = $(`#${buttonId}`).data('id')
      $.ajax(`/api/unfavourite/${itemId}`, { method: 'POST' })
      .then(function(){
        renderFavourites()
      })
    })
  })
}

$(document).ready(function(){
  renderFavourites()
})
