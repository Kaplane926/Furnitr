AOS.init();

const data = [

];

const checkboxes = document.querySelectorAll("input[type='checkbox']"),
      cardContainer = document.getElementById("wrapper");

var checkboxValues = [];

populateResults();

checkboxes.forEach((box) => {
      //ensures that all checkboxes are unchecked when the window reloads
      box.checked = false;
      box.addEventListener("change", () => filterCards());
});

function populateResults() {
      var time = 100;

      data.forEach((obj) => {
        
      });
}

function grabCheckboxValues() {
      var checkboxValues = [];
      checkboxes.forEach((checkbox) => {
            if (checkbox.checked) checkboxValues.push(checkbox.value);
      });
      return checkboxValues;
}

function filterItems() {
      wrapper.innerHTML = "";
      checkboxValues = grabCheckboxValues();

      data.forEach((item) => {
            let classes = item.classes;
            let result = (arr, target) => target.every((v) => arr.includes(v));

            let isMatch = result(classes, checkboxValues);
            if (isMatch) {


              var card = `
            <div data-aos="zoom-in" data-aos-duration=400 class="card" style="background-color:${randomColor}; margin:4px;" data-aos-offset="500">
            <h1 class="title">${item.title}</h1>
            </div>
        `;
                  wrapper.innerHTML += card;
            }
      });
}
