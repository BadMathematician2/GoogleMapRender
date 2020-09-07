class Polygons extends BaseMap {

    renderPolygons() {
        this.request((data) => {
            let polygons = JSON.parse(data)
            this.getMap().setCenter(polygons[0].points[0])
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
}
