let map;

function initMap() {
    // Initialize the map and set default view over India
    map = L.map('map').setView([20.5937, 78.9629], 5);

    // Set up the OpenStreetMap layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
}

function searchLocation() {
    const location = document.getElementById("location").value;
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;

                // Set map view to the searched location
                map.setView([lat, lon], 12);

                // Fetch heritage and cultural sites nearby
                fetchHeritageSites(lat, lon);
            } else {
                alert("Location not found!");
            }
        });
}

function fetchHeritageSites(lat, lon) {
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:5000,${lat},${lon})["tourism"~"attraction|museum|viewpoint|theme_park"];node(around:5000,${lat},${lon})["amenity"="place_of_worship"];out;`;

    fetch(overpassUrl)
        .then(response => response.json())
        .then(data => {
            // Clear existing markers
            map.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            // Add markers for heritage sites, temples, mosques, churches, and museums
            data.elements.forEach(site => {
                const siteName = site.tags.name || getPlaceType(site.tags);

                if (siteName) {
                    L.marker([site.lat, site.lon])
                        .addTo(map)
                        .bindPopup(siteName);
                }
            });
        });
}

// Helper function to name unnamed places based on their type
function getPlaceType(tags) {
    if (tags.tourism === "attraction") return "Attraction";
    if (tags.tourism === "museum") return "Museum";
    if (tags.tourism === "viewpoint") return "Viewpoint";
    if (tags.tourism === "theme_park") return "Theme Park";
    if (tags.amenity === "place_of_worship") {
        if (tags.religion === "christian") return "Church";
        if (tags.religion === "muslim") return "Mosque";
        if (tags.religion === "hindu") return "Temple";
        if (tags.religion === "buddhist") return "Buddhist Temple";
        return "Place of Worship";
    }
    return null;
}

// Initialize the map on page load
window.onload = initMap;
