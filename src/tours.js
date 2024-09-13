// Coordinates for Udupi Service Bus Station and Malpe Beach
var udupiServiceBusStation = [13.340881, 74.755131];  // Udupi Service Bus Station coordinates
var malpeBeach = [13.3495, 74.7032];              // Malpe Beach coordinates

// Initialize the map
var map = L.map('map').setView(udupiServiceBusStation, 13);  // Centered on Udupi Service Bus Station

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// Add routing control for the route from Udupi Service Bus Station to Malpe Beach
L.Routing.control({
    waypoints: [
        L.latLng(udupiServiceBusStation),  // Udupi Service Bus Station
        L.latLng(malpeBeach)               // Malpe Beach
    ],
    routeWhileDragging: true
}).addTo(map);

// Add markers for Start (Udupi Service Bus Station) and Destination (Malpe Beach)
L.marker(udupiServiceBusStation).addTo(map)
    .bindPopup('Start: Udupi Service Bus Station').openPopup();

L.marker(malpeBeach).addTo(map)
    .bindPopup('Destination: Malpe Beach');
