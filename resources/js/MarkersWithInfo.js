class MarkersWithInfo extends BaseMap {

    constructor(url) {
        super(url);
        this.markerCluster = null
        this.markers = []
        this.infowindow = null
        this.markers_positions_lat = []
        this.markers_positions_lng = []
    }

    renderMarkers() {
        google.maps.event.addListener(this.getMap(), 'bounds_changed', (_) => {
            this.request((data) => {
                let points = JSON.parse(data)

                this.deleteOld()

                this.markers.map(marker => {
                    this.markers_positions_lat.push(marker.getPosition().lat())
                    this.markers_positions_lng.push(marker.getPosition().lng())
                })

                points.map(point => {
                    if (this.needRender(point.loc)) {
                        this.render(point)
                    }
                })
            })
        })

    }

    needRender(point) {
        return this.getMap().getBounds().contains(point) && ! this.markers_positions_lat.includes(point.lat) && ! this.markers_positions_lng.includes(point.lng)
    }

    initMarkerCluster() {
        this.markerCluster = new MarkerClusterer(this.getMap(), [], {
            imagePath: this.getImagePath(),
            gridSize: 200,
            averageCenter: false })

        return this.markerCluster
    }

    getMarkerCluster() {
        return (null === this.markerCluster) ? this.initMarkerCluster() : this.markerCluster
    }

    render(point) {
        let marker = new google.maps.Marker({
            map: this.getMap(),
            position: point.loc,
            icon: point.icon
        })

        marker.addListener('click', () => {
            this.setWindowContent(point)
            this.getInfoWindow().open(this.getMap(), marker);
        })

        this.markers.push(marker)
        this.getMarkerCluster().addMarker(marker)
    }

    getImagePath() {
        return 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    }

    initInfoWindow() {
        this.infowindow = new google.maps.InfoWindow({
            map: this.getMap()
        })

        return this.infowindow
    }

    getInfoWindow() {
        return (null === this.infowindow) ? this.initInfoWindow() : this.infowindow
    }

    deleteOld() {
        this.markers.map(marker => {
            if (! this.getMap().getBounds().contains(marker.getPosition())) {
                this.getMarkerCluster().removeMarker(marker)
                this.markers_positions_lng.splice(this.markers_positions_lng.indexOf(marker.getPosition().lng()))
                this.markers_positions_lat.splice(this.markers_positions_lat.indexOf(marker.getPosition().lat()))
                this.markers.splice(this.markers.indexOf(marker), 1)
            }
        })
    }

    setWindowContent(point) {
        const request = {
            placeId: point.place_id,
            fields: ["name", "formatted_address", "place_id", "geometry", "photos"]
        }

        const service = new google.maps.places.PlacesService(this.getMap())
        service.getDetails(request, (place, status) => {
            if (this.isStatusOk(status)) {
                this.getInfoWindow().setContent(
                    this.placeContent(place)
                )
            }
        })
    }

    isStatusOk(status) {
        return status === google.maps.places.PlacesServiceStatus.OK
    }

    placeContent(place) {
        return "<div><strong>" +
            place.name +
            "</strong><br>" +
            "Place ID: " +
            place.place_id +
            "<br>" +
            place.formatted_address +
            "</div>" +
            this.getPhoto(place)
    }

    getPhoto(place) {
        return (typeof place['photos'] !== "undefined") ? '<img width="300px" height="250px" src=' + place.photos[0].getUrl() + '>' : ''
    }
}
