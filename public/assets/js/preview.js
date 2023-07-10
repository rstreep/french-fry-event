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
const delay = 300000;
const eventData = await getEventData();
setTimeout(async () => {
renderEventData(eventData);

// Make the input fields read-only
const inputFields = document.querySelectorAll('.validate');
inputFields.forEach((input) => {
input.readOnly = true;
});
}, delay);
});