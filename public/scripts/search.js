function displayPriceRangeBoxes() {
$.ajax('/api/furnitr', { method: 'GET' })
    .then(function(data) {
      const items = data.rows;
      const sortedItems = items.sort((firstItem, secondItem) => firstItem.price - secondItem.price);
      const colonChecker = $(input[type="checkbox"]).find(":checked");

      let item = null;

      if (colonChecker.id === "under-100") {
        sortedItems.filter(x => x.price > 0 && x.price < 100)
      }

      else if (colonChecker.id === "100-500") {
        sortedItems.filter(x => x.price >= 100 && x.price <= 500)
      }

      else if (colonChecker.id === "over-500") {
        sortedItems.filter(x => x.price > 500)
      }

      else if (item !== null) {
        
        $('#content').data('item_id', item.id)
        $('.item-title').html(`${item.title} <b> $${item.price} </b>`)
        $('.item-desc').html(`${item.description}`)
        $('.price').html(`${item.price}`)
        $('.items').html(`<img src ="${item.image_url}"></img>`)
        }
      else {
        $('.item-title').html(` <b> </b>`)
        $('.item-desc').html(`Uh oh! You've searched through all the available listings`)
        $('.items').html(`<img src ="/images/uh-oh.png"></img>`)
        $('.like').hide()
        $('.dislike').hide()
      }
    }
  };


$(document).ready(function(){ 
      displayPriceRangeBoxes()
      $('.like').click(function(){
        console.log("clicked")
        const itemID = $('#content').data('item_id')
        $.ajax(`/api/furnitrFavourite/${itemID}`, { method: 'POST' })
        .then(function(data){
    
          console.log("favourites called! ", data)
          displayPriceRangeBoxes()
        })
        .catch(console.log);
      })
    
      $('.dislike').click(function(){
    
        const itemID = $('#content').data('item_id')
        $.ajax(`/api/furnitrDislike/${itemID}`, { method: 'POST' })
        .then(function(data){
    
          console.log("dislikes called! ", data)
          displayPriceRangeBoxes()
        })
        .catch(console.log);
      })
    })
      console.log(sortedItems);
