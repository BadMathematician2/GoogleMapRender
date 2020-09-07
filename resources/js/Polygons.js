class Polygons extends BaseMap {

    renderPolygons() {
        this.request((data) => {
            let polygons = JSON.parse(data)
            this.zoomAndCenter(polygons)
            polygons.map(polygon => {
                (polygon.points.length !== 2) ? this.newPolygon(polygon) : this.newRectangle(polygon)
            })
        })
    }

    newPolygon(polygon) {
        new google.maps.Polygon({
            paths: polygon.points,
            strokeColor: polygon.color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: polygon.color,
            fillOpacity: 0.30,
            map: this.getMap()
        })
    }

    newRectangle(polygon) {
        new google.maps.Rectangle({
            strokeColor: polygon.color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: polygon.color,
            fillOpacity: 0.30,
            map: this.getMap(),
            bounds: {
                north: polygon.points[1].lat,
                south: polygon.points[0].lat,
                east: polygon.points[1].lng,
                west: polygon.points[0].lng
            }
        })
    }

    zoomAndCenter(polygons) {
        let minLat = polygons[0].points[0].lat
        let maxLat = polygons[0].points[1].lat
        let minLng = polygons[0].points[0].lng
        let maxLng = polygons[0].points[1].lng
        const max = (x, y) => x > y ? x : y
        const min = (x, y) => x < y ? x : y

        polygons.map(polygon => {
            polygon.points.map(p => {
                minLat = min(minLat, p.lat)
                maxLat = max(maxLat, p.lat)
                minLng = min(minLng, p.lng)
                maxLng = max(maxLng, p.lng)
            })

        })

        let bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(minLat,minLng),
            new google.maps.LatLng(maxLat, maxLng)
        )
        this.getMap().setCenter(bounds.getCenter())
        this.getMap().fitBounds(bounds)

    }
}
