class Markers extends BaseMap {

    constructor(url) {
        super(url);
        this.markerCluster = null
        this.markers = []
    }

    renderMarkers() {
        google.maps.event.addListener(this.getMap(), 'bounds_changed', (_) => {
            this.request((data) => {
                let points = JSON.parse(data)

                this.markers.forEach(marker => marker.setMap(null))
                this.getMarkerCluster().removeMarkers(this.markers)
                this.markers = []

                points.forEach(point => {
                    if (this.getMap().getBounds().contains(point.loc)) {
                        this.render(point)
                    }
                })

                this.getMarkerCluster().addMarkers(this.markers)
            })
        })
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
        this.markers.push(marker)
    }

    getImage(point) {
        return (typeof point['image'] !== "undefined") ? point['image'] : ''
    }

    getImagePath() {
        return 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    }

}
