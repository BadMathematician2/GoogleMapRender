class PolygonsOnClick {
    constructor(center = {lat: 40.413679, lng: -3.707442}, color = "#FF7777") {
        this.color = color
        this.center = center
        this.map = null
        this.markers = []
        this.points = []
        this.polygon = new google.maps.Polygon(null)
        this.needClean = false
    }

    initMap() {
        this.map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: this.center,
            mapTypeId: "terrain"
        })

        return this.map
    }

    getMap() {
        return (null === this.map) ? this.initMap() : this.map
    }

    renderMarker(point) {
        let marker = new google.maps.Marker({
            map: this.getMap(),
            position: point
        })
        this.points.push(point)
        this.markers.push(marker)
    }

    renderPolygon() {
        this.polygon.setMap(null)
        this.polygon = new google.maps.Polygon({
            paths: this.points,
            strokeColor: this.color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: this.color,
            fillOpacity: 0.30,
            map: this.getMap()
        })
    }

    newPolygon(event) {
        this.cleanMarkers()
        this.renderMarker(event.latLng)
        this.renderPolygon()
    }

    cleanMarkers() {
        if (this.needClean) {
            this.markers.map(marker => marker.setMap(null))
            this.markers = []
            this.polygon.setMap(null)
            this.needClean = false
        }
    }

    addListener(button, closure) {
        this.getMap().addListener(button, closure)
    }

    render() {
        this.addListener('click', event => {
            this.newPolygon(event)
        })
        this.addListener('rightclick', event => {
            this.newPolygon(event)
            this.points = []
            this.needClean = true
        })
    }

}
