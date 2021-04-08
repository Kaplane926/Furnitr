AOS.init();

const data = [

];

const checkboxes = document.querySelectorAll("input[type='checkbox']"),
      cardContainer = document.getElementById("wrapper");

var checkboxValues = [];

populateCards();

checkboxes.forEach((box) => {
      //ensures that all checkboxes are unchecked when the window reloads
      box.checked = false;
      box.addEventListener("change", () => filterCards());
});

function populateCards() {
      var time = 100;

      data.forEach((obj) => {
            let red = Math.floor(Math.random() * (180 - 100) + 100);
            let green = Math.floor(Math.random() * (180 - 100) + 100);
            let blue = Math.floor(Math.random() * (180 - 100) + 100);

            let randomColor = `rgb(${red},${green},${blue} )`;

            var card = `
            <div data-aos="fade-up" data-aos-duration=${time} data-aos-delay=300 class="card" style="   background-color:${randomColor}; margin:10px;">
            <h1 class="title">${obj.title}</h1>
            </div>
        `;
            time += 50;
            wrapper.innerHTML += card;
      });
}

function grabCheckboxValues() {
      var checkboxValues = [];
      checkboxes.forEach((checkbox) => {
            if (checkbox.checked) checkboxValues.push(checkbox.value);
      });
      return checkboxValues;
}

function filterCards() {
      wrapper.innerHTML = "";
      checkboxValues = grabCheckboxValues();

      data.forEach((item) => {
            let classes = item.classes;
            let result = (arr, target) => target.every((v) => arr.includes(v));

            let isMatch = result(classes, checkboxValues);
            if (isMatch) {
                  let red = Math.floor(Math.random() * 200);
                  let green = Math.floor(Math.random() * 200);
                  let blue = Math.floor(Math.random() * 200);

                  let randomColor = `rgb(${red},${green},${blue} )`;

                  var card = `
            <div data-aos="zoom-in" data-aos-duration=400 class="card" style="background-color:${randomColor}; margin:4px;" data-aos-offset="500">
            <h1 class="title">${item.title}</h1>
            </div>
        `;
                  wrapper.innerHTML += card;
            }
      });
}
