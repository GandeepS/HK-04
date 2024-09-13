// Coordinates for Udupi City Bus Terminus and Malpe Beach
var udupiBusTerminus = [13.340880, 74.755140];  // Udupi City Bus Terminus coordinates
var malpeBeach = [13.3495, 74.7032];            // Malpe Beach coordinates

// Coordinates for resorts (example coordinates, replace with actual locations)
var resorts = [
    { lat: 13.3400, lon: 74.7500, name: "Resort A" },  // Example resort
    { lat: 13.3450, lon: 74.7400, name: "Resort B" },  // Example resort
    { lat: 13.3550, lon: 74.7300, name: "Resort C" }   // Example resort
];

// Initialize the map
var map = L.map('map').setView(udupiBusTerminus, 13);  // Centered on Udupi City Bus Terminus

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// Function to geocode the location (using Nominatim API for free geocoding)
function geocodeLocation(location, callback) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                var latlng = [data[0].lat, data[0].lon];
                callback(latlng);  // Return the coordinates
            } else {
                alert('Location not found!');
            }
        })
        .catch(err => {
            console.error('Error:', err);
            alert('Unable to find the location.');
        });
}

// Event listener for the "Show Route" button
document.getElementById('findRoute').addEventListener('click', function() {
    var startLocation = document.getElementById('start').value;
    var destinationLocation = document.getElementById('destination').value;

    // Geocode both the start and destination locations
    geocodeLocation(startLocation, function(startLatLng) {
        geocodeLocation(destinationLocation, function(destinationLatLng) {
            
            // Remove any existing route from the map
            if (typeof routingControl !== 'undefined') {
                map.removeControl(routingControl);
            }

            // Add routing control for the route from Start to Destination
            routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(startLatLng),     // User input start location
                    L.latLng(destinationLatLng) // User input destination location
                ],
                routeWhileDragging: true
            }).addTo(map);

            // Add markers for Start and Destination
            L.marker(startLatLng).addTo(map)
                .bindPopup('Start: ' + startLocation).openPopup();
            
            L.marker(destinationLatLng).addTo(map)
                .bindPopup('Destination: ' + destinationLocation);

            // Add markers for resorts with custom icons
            var resortIcon = L.icon({
                iconUrl: 'https://imgs.search.brave.com/T0XncGjADOjVclynQB94yuMuV664W85qg-GbNqaKZ00/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuZHJ5aWNvbnMu/Y29tL3VwbG9hZHMv/aWNvbi9wcmV2aWV3/LzgyMDEvc21hbGxf/MXhfYjA4MDE3OWIt/NjFkNC00NmE4LWE2/NmUtOTE3ZGU5MWRm/YTEwLnBuZw',  // Replace with your custom icon URL
                iconSize: [32, 32],  // Size of the icon
                iconAnchor: [16, 32],  // Anchor point of the icon (center of the icon)
                popupAnchor: [0, -32]  // Popup anchor point
            });

            resorts.forEach(function(resort) {
                L.marker([resort.lat, resort.lon], { icon: resortIcon }).addTo(map)
                    .bindPopup(resort.name);
            });
        });
    });
});
