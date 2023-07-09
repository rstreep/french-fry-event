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
    document.getElementById("finalLat").value = finalLat ? finalLat.toFixed(6) : '';
    document.getElementById("finalLong").value = finalLong ? finalLong.toFixed(6) : '';
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

    var modal = document.querySelector("#modal1");
    if (modal.dataset.state === "hidden") {
        modal.dataset.state = "hidden";
        modal.style.display = "none"; // Set display to "none" to hide the modal
    } else {
    modal.dataset.state = "hidden";
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

  var startMarker, endMarker;
var dir, routeLayer;
var start, end;

function runDirections(startLocation, endLocation) {
  start = startLocation;
  end = endLocation;
  
  dir = MQ.routing.directions();
  dir.route({
    locations: [
      start,
      end
    ]
  });

  CustomRouteLayer = MQ.Routing.RouteLayer.extend({
    createMarker: function (location) {
      var lat = location.latLng.lat;
      var lng = location.latLng.lng;
      var marker = L.marker([lat, lng], { draggable: true }).addTo(map);

      // Update the route when the marker is dragged
      marker.on('dragend', function (e) {
        var newLatLng = e.target.getLatLng();

        if (marker === startMarker) {
          start = newLatLng.lat + ',' + newLatLng.lng;
        } else if (marker === endMarker) {
          end = newLatLng.lat + ',' + newLatLng.lng;
        }

        updateRoute();
      });

      return marker;
    }
  });

  routeLayer = new CustomRouteLayer({
    directions: dir,
    fitBounds: true
  });

  routeLayer.addTo(map);

  // Create the start and end markers
  startMarker = createMarker(start);
  endMarker = createMarker(end);
}

function createMarker(location) {
  var latLng = L.latLng(location.split(','));

  var marker = L.marker(latLng, { draggable: true }).addTo(routeLayer);

  marker.on('dragend', function (e) {
    var newLatLng = e.target.getLatLng();

    if (marker === startMarker) {
      start = newLatLng.lat + ',' + newLatLng.lng;
    } else if (marker === endMarker) {
      end = newLatLng.lat + ',' + newLatLng.lng;
    }

    updateRoute();
  });

  return marker;
}

function updateRoute() {
  dir.route({
    locations: [
      start,
      end
    ]
  });

  routeLayer.destroy(); // Remove the current route layer

  routeLayer = new CustomRouteLayer({
    directions: dir,
    fitBounds: true
  });

  routeLayer.addTo(map);
}

function submitForm(event) {
  event.preventDefault();

  // Delete current map layer (so when you type in a new location the old route doesn't stay on the map)
  if (routeLayer) {
    map.removeLayer(routeLayer);
  }

  // Get form data
  var startLocation = document.getElementById("start").value;
  var endLocation = document.getElementById("destination").value;

  // Run directions function
  runDirections(startLocation, endLocation);
}

const form = document.getElementById('form');
// Call the submitForm function when submit
form.addEventListener('submit', submitForm);

var id;
async function fetchData() {
  try {
  const response = await fetch(`/api/events`);
  const data = await response.json();
  console.log(data);
  id = data[0].event_id;
  return data[0];
  } catch (error) {
  console.log(error);
  return null;
  }
  }
  
  function renderEventData(data) {
  if (data) {
  document.getElementById('event-name').value = data.event_name;
  document.getElementById('event-description').value = data.event_description;
  document.getElementById('event-type').value = data.event_type;
  document.getElementById('street-address').value = data.street_address;
  document.getElementById('city').value = data.city;
  document.getElementById('state').value = data.state;
  document.getElementById('zip-code').value = data.zip;
  document.getElementById('event-date').value = data.event_date;
  }
  }
  
  async function getEventData() {
  const eventData = await fetchData();
  renderEventData(eventData);
  }
  
  document.addEventListener('DOMContentLoaded', async () => {
    // Delay rendering for 5 minutes (300,000 milliseconds)
    const delay = 100000;
    const eventData = await getEventData();
    setTimeout(async () => {
    renderEventData(eventData);
    }, delay);
    });
    
    async function updateEventData(id, data) {
      try {
        console.log(id);
        const response = await fetch(`/api/events/event/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response);
        return response.ok;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
    
    document.addEventListener('DOMContentLoaded', () => {
      const submitButton = document.getElementById('submit-btn');
      const eventForm = document.getElementById('event-form');
    
      submitButton.addEventListener('click', async (e) => {
        e.preventDefault();
    
        const updatedData = {
          id: id, 
          event_name: document.getElementById('event-name').value,
          event_description: document.getElementById('event-description').value,
          event_type: document.getElementById('event-type').value,
          street_address: document.getElementById('street-address').value,
          city: document.getElementById('city').value,
          state: document.getElementById('state').value,
          zip: document.getElementById('zip-code').value,
          event_date: document.getElementById('event-date').value,
        };
    
        // Call the updateEventData function
        const success = await updateEventData(updatedData.id, updatedData);
    
        if (success) {
          console.log('Event data updated successfully');
          window.location.href="/preview";
        } else {
          console.log('Failed to update event data');
        }
    
        // Clear form or display success message
       
        console.log('Form submitted successfully!');
      });
    });
    