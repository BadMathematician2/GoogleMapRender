class PolygonsOnClick extends BaseMap {

    constructor(url, center = {lat: 40.413679, lng: -3.707442}, color = "#FF7777",token = $('meta[name="csrf-token"]').attr('content')) {
        super(url, token);
        this.color = color
        this.center = center
        this.map = null
        this.markers = []
        this.polygon = new google.maps.Polygon(null)
        this.needClean = false
    }

    getPoints() {
        return this.markers.map(marker => {
            return marker.position
        })
    }

    renderMarker(point) {
        let marker = new google.maps.Marker({
            map: this.getMap(),
            position: point
        })
        this.markers.push(marker)
    }

    renderPolygon() {
        this.polygon.setMap(null)
        this.polygon = new google.maps.Polygon({
            paths: this.getPoints(),
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
            this.needClean = true
        })

        this.buttons()
    }

    getLocations() {
        return this.markers.map(marker => {
            return {lat: marker.getPosition().lat(), lng: marker.getPosition().lng()}
        })
    }

    createElementUI(id, title, innerHTML, controlDiv) {
        const element = document.createElement("div")
        element.id = id
        element.title = title
        element.innerHTML = innerHTML
        controlDiv.appendChild(element)

        return element
    }

    buttons() {
        const controlDiv = document.createElement("div")

        const clearPolygonUI = this.createElementUI("clearPolygonUI", "Click to clear polygon in the map", "", controlDiv)
        const clearPolygonText = this.createElementUI("clearPolygonText", "","Clear Polygon", clearPolygonUI)
        const sendPolygonUI = this.createElementUI("sendPolygonUI", "Click to send polygon`s coordinates in DB", "", controlDiv)
        const sendPolygonText = this.createElementUI("sendPolygonText", "", "Send Polygon", sendPolygonUI)

        clearPolygonUI.addEventListener("click", () => {
            this.needClean = true
            this.cleanMarkers()
            this.polygon.setMap(null)
        })

        sendPolygonUI.addEventListener("click", () => {
            this.request((_) => {}, {polygon: this.getLocations()})
        })

        controlDiv.index = 1;
        controlDiv.style.paddingTop = "10px";
        this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
            controlDiv
        )

    }

}
