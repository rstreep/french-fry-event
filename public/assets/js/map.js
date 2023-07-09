var map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [49.228537499999995, -123.10585798903601],
    zoom: 12,
});
var previousRouteLayer; // Declare variable to store the previous route layer

var marker; // Variable to store the marker
var finalLat;
var finalLong;
// Click event handler
function onMapClick(e) {
    console.log(e.latlng);
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
    
    // Remove previous marker if it exists
    if (marker) {
    map.removeLayer(marker);
    }
    
    // Add a new marker at the clicked location
    marker = L.marker([lat, lng]).addTo(map);
    
    // Retrieve the coordinates
    var markerLat = lat;
    var markerLng = lng;
    
    // coordinates
    console.log('Marker Coordinates:', markerLat, markerLng);
    finalLat = markerLat;
    finalLong = markerLng;
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
    // if (e) {
    //     document.querySelector("#lat").value = e.latlng.lat;
    //     document.querySelector("#lng").value = e.latlng.lng;
    // }
    var modal = document.querySelector("#modal1");
    if (modal.dataset.state === "show") {
        modal.dataset.state = "hidden";
        modal.style.display = "none"; // Set display to "none" to hide the modal
    } else {
    modal.dataset.state = "show";
    modal.style.display = ""; // Reset display to its default value to show the modal
    }
    
}
function captureText(e) {
    e.preventDefault();
    var iconNameInput = document.querySelector("#icon-name-input");
    var text = iconNameInput.value;

    displayModal();

    // Retrieve the finalLat and finalLong from onMapClick function
    var lat = finalLat.toString();
    var lng = finalLong.toString();

    postMapData(text, lat, lng);
}

function removeMarker(e) {
    e.preventDefault()
    if (marker) {
        map.removeLayer(marker);
        marker = null; // Reset the marker variable
        }
}


// Add the click event listener to the map
// map.addEventListener('click', onMapClick);
map.addEventListener('click', displayModal);

function cancelModal(){
    var modal = document.querySelector("#modal1");
    if(modal.dataset.state === "show"){
    modal.dataset.state = "hidden";
    // modal.textContent = "";
    }
    else{
    modal.dataset.state = "show";
    // modal.textContent = modal.dataset.num;
    }
    }

    var iconNameForm = document.querySelector("#icon-name");
    iconNameForm.addEventListener('submit', function(event) {
    event.preventDefault();
    captureText(event);
    });




document.getElementById("cancel-button").addEventListener("click", function(e) {
    e.preventDefault(); // Prevent form submission
 
    cancelModal();
    removeMarker();
    modal.style.display = "none";
  
    if (marker) {
      map.removeLayer(marker);
    }
    return false;
  });

  function runDirections(start, end) {
    var dir = MQ.routing.directions();
    dir.route({
      locations: [start, end]
    });
  
    CustomRouteLayer = MQ.Routing.RouteLayer.extend({
      createMarker: (location) => {
        var lat = location.latLng.lat;
        var lng = location.latLng.lng;
        var marker = L.marker([lat, lng]).addTo(map);
        return marker;
      },
    });
  
    // Remove previous route layer if it exists
    if (previousRouteLayer) {
      map.removeLayer(previousRouteLayer);
    }
  
    var routeLayer = new CustomRouteLayer({
      directions: dir,
      fitBounds: true
    });
  
    routeLayer.on('draw:created', function (e) {
      // Your code for handling the created layer
    });
  
    map.addLayer(routeLayer);
  
    // Store the current route layer as the previous one
    previousRouteLayer = routeLayer;
  }
  
  function submitForm(event) {
    event.preventDefault();
  
    // Delete current map layer (so the old route doesn't stay on the map)
    if (previousRouteLayer) {
      map.removeLayer(previousRouteLayer);
    }
  
    // Get form data
    var start = document.getElementById("start").value;
    var end = document.getElementById("destination").value;
  
    // Run directions function
    runDirections(start, end);
  }
  
  const form = document.getElementById('form');
  form.addEventListener('submit', submitForm);
  document.getElementById('locations');

  // Add event listener to the button
  const locationsButton = document.getElementById('locations');
  locationsButton.addEventListener('click', getAllMapData, { passive: true });
  
  async function getAllMapData() {
    const response = await fetch('/api/map/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
    };