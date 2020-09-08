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
            icon: this.getImage(point)
        })

        marker.addListener('click', () => {
            this.getInfoWindow().setContent(this.getContent(point).toString())
            this.getInfoWindow().open(this.getMap(), marker);
        })

        this.markers.push(marker)
        this.getMarkerCluster().addMarker(marker)
    }

    getImage(point) {
        return (typeof point['image'] !== "undefined") ? point['image'] : ''
    }

    getContent(point) {
        return (typeof point['content'] !== "undefined") ? point['content'] : ''
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
}
