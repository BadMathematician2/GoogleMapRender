function initMap() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        }
    });

    $.post({
        url: 'http://test.local/polygons',
        success: function (data) {
            let polygons = JSON.parse(data)
            let center = [polygons[0].points[0].lat, polygons[0].points[0].lng]
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 8,
                center: {
                    lat: center[0],
                    lng: center[1]
                },
                mapTypeId: "terrain"
            });

            polygons.map(polygon => render(polygon, map))
        }
    });
}
function render(polygon, map) {
    if (polygon.points.length !== 2) {
        const coords = polygon.points;
        new google.maps.Polygon({
            paths: coords,
            strokeColor: polygon.color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: polygon.color,
            fillOpacity: 0.30,
            map: map
        })
    } else {
        new google.maps.Rectangle({
            strokeColor: polygon.color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: polygon.color,
            fillOpacity: 0.30,
            map: map,
            bounds: {
                north: polygon.points[1].lat,
                south: polygon.points[0].lat,
                east: polygon.points[1].lng,
                west: polygon.points[0].lng
            }
        });
    }
}
