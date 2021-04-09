// AOS.init();

// const data = [

// ];

// const checkboxes = document.querySelectorAll("input[type='checkbox']"),
//       cardContainer = document.getElementById("wrapper");

// var checkboxValues = [];

// populateResults();

// checkboxes.forEach((box) => {
//       //ensures that all checkboxes are unchecked when the window reloads
//       box.checked = false;
//       box.addEventListener("change", () => filterCards());
// });

// // if unchecked, see all  results
// // if checked see all results
// // grab all items
// // sort all from min to max price
// // divide by three into portions




// function populateResults() {
//       var time = 100;

//       data.forEach((obj) => {
        
//       });
// }

// function grabCheckboxValues() {
//       var checkboxValues = [];
//       checkboxes.forEach((checkbox) => {
//         if (checkbox.checked) checkboxValues.push(checkbox.value);
//       });
//       return checkboxValues;
// }

// function filterItems() {
//       wrapper.innerHTML = "";
//       checkboxValues = grabCheckboxValues();

//       data.forEach((item) => {
//             let classes = item.classes;
//             let result = (arr, target) => target.every((v) => arr.includes(v));

//             let isMatch = result(classes, checkboxValues);
//             if (isMatch) {


//               var card = `
//             <div data-aos="zoom-in" data-aos-duration=400 class="card" style="background-color:${randomColor}; margin:4px;" data-aos-offset="500">
//             <h1 class="title">${item.title}</h1>
//             </div>
//         `;
//                   wrapper.innerHTML += card;
//             }
//       });
// }



function displayPriceRangeBoxes() {
  $.ajax('/api/furnitr', { method: 'GET' })
    .then(function(data){
      const items = data.rows;
      console.log(items);
      const sortedItems = items.sort((firstItem, secondItem) => firstItem.price - secondItem.price);
      console.log(sortedItems);
    }) 
} 

function fetchItem(){
  $.ajax('/api/furnitr', { method: 'GET' })
  .then(function(data){
    const item = data.rows[0]
    if(item !== undefined){
    $('#content').data('item_id', item.id)
    $('.item-title').html(`${item.title} <b> $${item.price} </b>`)
    $('.item-desc').html(`${item.description}`)
    $('.items').html(`<img src ="${item.image_url}"></img>`)
    }
    else{
      $('.item-title').html(` <b> </b>`)
      $('.item-desc').html(`Uh oh! You've searched through all the available listings`)
      $('.items').html(`<img src ="/images/uh-oh.png"></img>`)
      $('.like').hide()
      $('.dislike').hide()
    }

  })
};