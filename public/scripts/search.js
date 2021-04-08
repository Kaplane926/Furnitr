



// const escape = function (str) {
//     let div = document.createElement('div');
//     div.appendChild(document.createTextNode(str));
//     return div.innerHTML;
//   }

// const itemsList = document.getElementById('itemsList');
// const searchBar = document.getElementById('searchBar');
// let items = [];

// searchBar.addEventListener('keyup', (e) => {
//     const searchString = e.target.value.toLowerCase();

//     const filteredItems = items.filter((items) => {
//         return (
//           items.title.toLowerCase().includes(searchString) ||
//           items.price.toLowerCase().includes(searchString) ||
//           items.zodiac_sign.toLowerCase().includes(searchString)
//         );
//     });
//     displayItems(filteredItems);
// });

// const loadItems = async () => {
//     try {
//         const res = await fetch('link to database');
//         items = await res.json();
//         displayItems(items);
//     } catch (err) {
//         console.error(err);
//     }
// };

// const displayItems = (items) => {
//     const htmlString = items
//         .map((item) => {
//             return `
//             <li class="character">
//                 <h2>${items.name}</h2>
//                 <p>${items.description}</p>
//                 <img src="${items.image}"></img>
//             </li>
//         `;
//         })
//         .join('');
//     itemsList.innerHTML = htmlString;
// };

// loadItems();

// jQuery(document).ready(function($){
//     $('.live-search-list li').each(function(){
//     $(this).attr('data-search-term', $(this).text().toLowerCase());
//     });
//     $('.live-search-box').on('keyup', function(){
//     var searchTerm = $(this).val().toLowerCase();
//         $('.live-search-list li').each(function(){
//             if ($(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
//                 $(this).show();
//             } else {
//                 $(this).hide();
//             }
//         });
//     });
//   });