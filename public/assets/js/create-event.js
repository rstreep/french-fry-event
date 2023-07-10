// const previousButton = document.querySelector('#prev')
// const nextButton = document.querySelector('#next')
// const submitButton = document.querySelector('#submit')
// const tabTargets = document.querySelectorAll('.tab')
// const tabPanels = document.querySelectorAll('.tabpanel')
// let currentStep = 0

// nextButton.addEventListener('click', (event) => {
//     event.preventDefault()
//     tabPanels[currentStep].classList.add('hidden')
//     tabTargets[currentStep].classList.remove('active')
//     tabPanels[currentStep + 1].classList.remove('hidden')
//     tabTargets[currentStep + 1].classList.add('active')
//     currentStep += 1
// })

// previousButton.addEventListener('click', (event) => {
//     event.preventDefault()
//     tabPanels[currentStep].classList.add('hidden')
//     tabTargets[currentStep].classList.remove('active')
//     tabPanels[currentStep - 1].classList.remove('hidden')
//     tabTargets[currentStep - 1].classList.add('active')
//     currentStep -= 1
//   })

// Get Menu API
document.addEventListener('DOMContentLoaded', function() {
    var tabs = document.querySelectorAll('.tabs');
    M.Tabs.init(tabs);
  });

  async function postNewEventData() {
    const response = await fetch(`/api/map`, {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    console.log(response);
  };

  document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('event-form');
    var submitBtn = document.getElementById('submit-btn');

    submitBtn.addEventListener('click', function(event) {
      event.preventDefault(); 

      // Get input values
      var event_Name = document.getElementById('event_name').value;
      var event_Description = document.getElementById('event_description').value;
      var event_Type = document.getElementById('event_type').value;
      var street_Address = document.getElementById('street_address').value;
      var city = document.getElementById('city').value;
      var state = document.getElementById('state').value;
      var zip = document.getElementById('zip').value;
      var event_Date = document.getElementById('event_date').value;

      // Create newEventData object
      var newEventData = {
        event_Name: event_Name,
        event_Description: event_Description,
        event_Type: event_Type,
        street_Address: street_Address,
        city: city,
        state: state,
        zip: zip,
        event_Date: event_Date,
      };

      console.log(newEventData); 
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    var addBtn = document.getElementById('add-guest-btn');
    var guestList = document.getElementById('guest-list');
    var guests = [];

    addBtn.addEventListener('click', function(guest) {
      event.preventDefault();

      var guestFirstName = document.getElementById('guestFName').value;
      var guestLastName = document.getElementById('guestLName').value;

      var guest = {
        firstName: guestFirstName,
        lastName: guestLastName,
      };

      guests.push(guest);

      document.getElementById('guestFName').value = '';
      document.getElementById('guestLName').value = '';

      renderGuestList(guest);

      console.log(guests);
    });

    function renderGuestList(guest) {
      guestList.innerHTML = '';

      guests.forEach(function(guest) {
        var guestItem = document.createElement('div');
        guestItem.textContent = guest.firstName + ' ' + guest.lastName;
        guestList.appendChild(guestItem);
      });
    }
  });

var apiID = "e0e48aa8";
var apiKey = "5ecc0a6a74140b8afe687fc73be0ddb2";
var genBtn = document.querySelector('#generate');

genBtn.onclick = function () {
    var userSearch = document.querySelector('#userSearch').value;
    // console.log(userSearch);
    event.preventDefault();
    // var dietEl = document.querySelector('#diets').value;
    // var healthEl = document.querySelector('#health-concerns').value;
    var menu = {};
    // appetizer fetch request
    fetch(`https://api.edamam.com/api/recipes/v2?type=any&dishType=Starter&app_id=${apiID}&app_key=${apiKey}&random=true`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var appetizers = data.hits.map(food => {
                // return `<a href="${food.recipe.url}">${food.recipe.label}</a>`;
                return {
                    link: food.recipe.url,
                    name: food.recipe.label
                }
            });
            // console.log(menu[0]);
            // console.log(menu[1]);
            menu.app1_link = appetizers[0].link;
            menu.app1_name = appetizers[0].name;
            menu.app2_link = appetizers[1].link;
            menu.app2_name = appetizers[1].name;
            // adds response to html at designated tags
            // document.querySelector('#app1').insertAdjacentHTML("afterbegin", menu.app1);
            // document.querySelector('#app2').insertAdjacentHTML("afterbegin", menu.app2);
            document.querySelector('#app1').innerHTML = `<a href="${menu.app1_link}">${menu.app1_name}</a>`;
            document.querySelector('#app2').innerHTML = `<a href="${menu.app2_link}">${menu.app2_name}</a>`;
        });
    // entree fetch request
    fetch(`https://api.edamam.com/api/recipes/v2?q=${userSearch}&type=any&dishType=Main%20course&app_id=${apiID}&app_key=${apiKey}&random=true`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var entrees = data.hits.map(food => {
                // return `<a href="${food.recipe.url}">${food.recipe.label}</a>`;
                return {
                    link: food.recipe.url,
                    name: food.recipe.label
                }
            });
            // console.log(menu[0]);
            // console.log(menu[1]);
            menu.ent1_link = entrees[0].link;
            menu.ent1_name = entrees[0].name;
            menu.ent2_link = entrees[1].link;
            menu.ent2_name = entrees[1].name;
            // adds response to html at designated tags
            // document.querySelector('#ent1').insertAdjacentHTML("afterbegin", menu.ent1);
            // document.querySelector('#ent2').insertAdjacentHTML("afterbegin", menu.ent2);
            document.querySelector('#ent1').innerHTML = `<a href="${menu.ent1_link}">${menu.ent1_name}</a>`;
            document.querySelector('#ent2').innerHTML = `<a href="${menu.ent2_link}">${menu.ent2_name}</a>`;
        });
    // desserts fetch request
    fetch(`https://api.edamam.com/api/recipes/v2?type=any&dishType=Desserts&app_id=${apiID}&app_key=${apiKey}&random=true`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var desserts = data.hits.map(food => {
                // return `<a href="${food.recipe.url}">${food.recipe.label}</a>`;
                return {
                    link: food.recipe.url,
                    name: food.recipe.label
                }
            });
            // console.log(menu[0]);
            // console.log(menu[1]);
            menu.des1_link = desserts[0].link;
            menu.des1_name = desserts[0].name;
            menu.des2_link = desserts[1].link;
            menu.des2_name = desserts[1].name;
            // adds response to html at designated tags
            // document.querySelector('#des1').insertAdjacentHTML("afterbegin", menu.des1);
            // document.querySelector('#des2').insertAdjacentHTML("afterbegin", menu.des2);
            document.querySelector('#des1').innerHTML = `<a href="${menu.des1_link}">${menu.des1_name}</a>`;
            document.querySelector('#des2').innerHTML = `<a href="${menu.des2_link}">${menu.des2_name}</a>`;
            document.getElementById("nextBtn").classList.remove("hide");

            console.log(menu);
        });
        
    };
