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
            
        });

        console.log(menu);
};

// let appetizer1 = document.querySelector('#app1');
    // let appetizer2 = document.querySelector('#app2');
    // let entree1 = document.querySelector('#ent1');
    // let entree2 = document.querySelector('#ent2');
    // let dessert1 = document.querySelector('#des1');
    // let dessert2 = document.querySelector('#des2');

    // let app1 = appetizer1.value;
    // let app2 = appetizer2.value;
    // let ent1 = entree1.value;
    // let ent2 = entree2.value;
    // let des1 = dessert1.value;
    // let des2 = dessert2.value;

    // const menu = {
    //     app_option_1: app1.recipe.label,
    //     app_option_2: app2,
    //     ent_option_1: ent1,
    //     ent_option_2: ent2,
    //     des_option_1: des1,
    //     des_option_2: des2
    // }

    // console.log(menu);
