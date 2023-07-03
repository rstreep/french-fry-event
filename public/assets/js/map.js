// // setting parameters
// var map = L.map('map', {
//     layers: MQ.mapLayer(),
//     center: [49.228537499999995, -123.10585798903601],
//     zoom: 12
// });
// var marker;
// function onMapClick(e) {
//     var lat = e.latlng.lat;
//     var lng = e.latlng.lng;

// if (marker) {
//     map.removeLayer(marker);
// }
// marker = L.marker([lat, lng]).addTo(map);
// }
// map.on('click', onMapClick);

// function runDirections(start, end){
//     map = initializeMap();
//     var dir =MQ.routing.directions();
//     dir.route({
//         locations: [
//             start,
//             end
//         ]
//     });
// }

//     CustomRouteLayer = MQ.Routing.RouteLayer.extend({
//         createStartMarker: (location) => {
//             var lat = location.latLng.lat;
//             var lng = location.latLng.lng;
//             var marker = L.marker([lat, lng]).addTo(map);
//             return marker;
//         },
//         createEndMarker: (location) => {
//             var lat = location.latLng.lat;
//             var lng = location.latLng.lng;
//             var marker = L.marker = L.marker([lat, lng]).addTo(map);
//             return marker;
//         }
//     });
//     var routeLayer = new CustomRouteLater({
//         directions: dir,
//         fitBounds: true
//     });
//     routeLayer.on('draw:created', function(e) {
//         layer = e.layer;
//         var lat = layer.getLatLng().lat;
//         var lng = layer.getLatLng().lng;
//         if (e.layerType === 'marker') {
//         var marker = L.marker([lat, lng]).addTo(map);
//         }
//     });
//     map.addLayer(routeLayer);


// //runs when form is submitted
// function submitForm(event) {
//     event.preventDefault();

//     //delete current map layer (so when you type in a new location the old route doesn't stay on the map)
//    if (layer) {
//     map.removeLayer(layer);
//    }

//     // get form data
//     var start = document.getElementById("start").value;
//     var end = document.getElementById("destination").value;

//     //run directions function
//     runDirections(start, end);
// }
// const form = document.getElementById('form');
// //call the submitForm function when submit
// form.addEventListener('submit', submitForm);

// setTimeout(function(){
//     var urlParams = new URLSearchParams(window.location.search);
//     var start = urlParams.get("start");
//     var destination = urlParams.get("destination");
//     $("#start").val(start);
//     $("#destination").val(destination);
//     $("#directions").click();   //how to add it in the separate window? -   window.open(url, '_blank');
// },500)

var map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [49.228537499999995, -123.10585798903601],
    zoom: 12,
});
var layer 

var marker; // Variable to store the marker

// Click event handler
async function onMapClick(e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
    // Remove previous marker if it exists
    if (marker) {
        map.removeLayer(marker);
    }

    // Add a new marker at the clicked location
    marker = L.marker([lat, lng]).addTo(map);
    console.log (marker._latlng)
    alert ("working")
    const response = await fetch(`/api/map`, {
        method: 'POST',
        body: JSON.stringify({ locaation_name: "home", lat: marker._latlng.lat, lng: marker._latlng.lng }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
}

// Add the click event listener to the map
map.addEventListener('click', onMapClick);

function runDirections(start, end) {
    var dir = MQ.routing.directions();
    dir.route({
        locations: [
            start,
            end
        ]
    });

    CustomRouteLayer = MQ.Routing.RouteLayer.extend({
        createMarker: (location) => {
            var lat = location.latLng.lat;
            var lng = location.latLng.lng;
            var marker = L.marker([lat, lng]).addTo(map);
            return marker;
        },
    });
   
    var routeLayer = new CustomRouteLayer({
        directions: dir,
        fitBounds: true
    });

    routeLayer.on('draw:created', function (e) {
        layer = e.layer;
        var lat = layer.getLatLng().lat;
        var lng = layer.getLatLng().lng;

        if (e.layerType === 'marker') {
            var marker = L.marker([lat, lng]).addTo(map);
            return marker;
        }
    });

    map.addLayer(routeLayer);
}

//runs when form is submitted
function submitForm(event) {
    event.preventDefault();

    //delete current map layer (so when you type in a new location the old route doesn't stay on the map)
    if (layer) {
        map.removeLayer(layer);
    }

    // get form data
    var start = document.getElementById("start").value;
    var end = document.getElementById("destination").value;

    //run directions function
    runDirections(start, end);
}

const form = document.getElementById('form');
//call the submitForm function when submit
form.addEventListener('submit', submitForm);

setTimeout(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var start = urlParams.get("start");
    var destination = urlParams.get("destination");
    $("#start").val(start);
    $("#destination").val(destination);
    $("#directions").click();   //how to add it in the separate window? -   window.open(url, '_blank');
}, 500);