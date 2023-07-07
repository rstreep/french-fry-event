var map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [39.228537499999995, -123.10585798903601],
    zoom: 12,
});

var marker; // Variable to store the marker

// Click event handler
function onMapClick(e) {
    console.log(e.latLng);
    var lat = e.latlng.lat.toString();
    var lng = e.latlng.lng.toString();

    // Remove previous marker if it exists
    if (marker) {
        map.removeLayer(marker);
    }

    // Add a new marker at the clicked location
    marker = L.marker([lat, lng]).addTo(map);

    // Retrieve the coordinates
    var markerLat = marker.getLatLng().lat;
    var markerLng = marker.getLatLng().lng;


    // coordinates 

    console.log('Marker Coordinates:', markerLat, markerLng);
    postMapData("test", markerLat, markerLng);

    // var customIcon = L.divIcon({
    // className: 'custom-marker',
    // html: `<div class="marker-label">${text}</div>`

    // });
    // marker.setIcon(customIcon)
}

// Add the click event listener to the map
map.on('click', onMapClick);

// console.log (marker._latlng)
async function postMapData(text, lat, lng) {
    const response = await fetch(`/api/map`, {
        method: 'POST',
        body: JSON.stringify({ location_name: text, lat: lat, lng: lng }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    console.log(response);
};
function displayModal(e) {
    if (e) {
        document.querySelector("#lat").value = e.latlng.lat;
        document.querySelector("#lng").value = e.latlng.lng;
    }
    var modal = document.querySelector("#modal1");
    if (modal.dataset.state === "show") {
        modal.dataset.state = "hidden";
        // modal.textContent = "";
    }
    else {
        modal.dataset.state = "show";
        // modal.textContent = modal.dataset.num;
    }
}
function captureText(e) {
    e.preventDefault()
    var iconNameInput = document.querySelector("#icon-name-input");
    var text = iconNameInput.value;
    var lat = document.querySelector("#lat").value
    var lng = document.querySelector("#lng").value
    displayModal()
    onMapClick(text, lat, lng)
    postMapData(text, lat, lng)
}
// Add the click event listener to the map
// map.addEventListener('click', onMapClick);
map.addEventListener('click', displayModal);
var iconNameForm = document.querySelector("#icon-name");
iconNameForm.addEventListener('submit', captureText);
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

    // setTimeout(function () {
    // var urlParams = new URLSearchParams(window.location.search);
    // var start = urlParams.get("start");
    // var destination = urlParams.get("destination");
    // $("#start").val(start);
    // $("#destination").val(destination);
    // $("#directions").click(); //how to add it in the separate window? - window.open(url, '_blank');
    // }, 500);