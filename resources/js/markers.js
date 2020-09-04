let markers = []
let points = []
function initMap() {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        }
    })

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: {lat: 40.672692, lng: -3.729143},
        mapTypeId: "terrain"
    });

    const markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
            gridSize: 200,
            averageCenter: false});

    google.maps.event.addListener(map, 'bounds_changed', function() {
        $.post({
            url: 'http://test.local/marker',
            success: function (data) {
                points = JSON.parse(data)
                console.log(points.length)
                markers.forEach(marker => marker.setMap(null))
                markerCluster.removeMarkers(markers)

                markers = []
                for (let i = 0; i < points.length; i++)
                    if (map.getBounds().contains(points[i])) {
                        marker = new google.maps.Marker({
                            map: map,
                            draggable: true,
                            position: {lat: points[i].lat, lng: points[i].lng}
                        })
                        markers.push(marker)
                    }
                markerCluster.addMarkers(markers)
                // markers.forEach(marker => marker.setMap(null))
            }})
    })
}

function render(point, map) {
    let image = ''
    if (typeof point['image'] !== "undefined") {
        image = point['image']
    }
    let marker = new google.maps.Marker({
        map: map,
        draggable: true,
        // animation: google.maps.Animation.DROP,
        position: {lat: point.lat, lng: point.lng},
        icon: image
    })

    markers.push(marker)

}
