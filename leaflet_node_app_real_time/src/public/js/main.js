const map = L.map('map-template').setView([41.364442, 1.131592], 9);

// inicialitzar conexió socket.io
const socket = io();

const osm =  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map)

const Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
Esri_WorldImagery.addTo(map)

// wms
var wms = L.tileLayer.wms("http://localhost:8080/geoserver/demo/wms?",{
    layers: 'demo:vacunesxcent',
    format: 'image/png',
    transparent: true,
    attribution: 'Propi',
})

// markers
var singleMarker = L.marker([41.398188, 2.178726]).addTo(map)
var popup = singleMarker.bindPopup('Estatua Miró.<br> La dona ocell');
popup.addTo(map)



//allow location webbrowser
map.locate({enableHighAccuracy: true});
map.on('locationfound', e => {
    const coords = [e.latlng.lat, e.latlng.lng];
    const marker = L.marker(coords);
    marker.bindPopup('You are here! <br>' + e.latlng.toString());
    marker.addTo(map);
    socket.emit('userCoordinates', e.latlng)
});

// socket new User connected
socket.on('newUserCoordinates', (coords) => {
    console.log('New user connected');
    const userIcon = L.icon({
        iconUrl: '/img/icon2.png',
        iconSize: [120, 62],
    })
    const newUserMarker = L.marker([coords.lat + 0.3, coords.lng], {
        icon: userIcon 
        });
        newUserMarker.bindPopup('New User! <br>' +'Long: ' + coords.lat + '<br>' + 'Lat: ' + coords.lng);
        map.addLayer(newUserMarker);
}); 


// layers control
var overlayMaps = {
    'vector data wms': wms,
    'Art': singleMarker,
};

L.control.layers(overlayMaps).addTo(map);