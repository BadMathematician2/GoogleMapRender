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
                    if (this.getMap().getBounds().contains(point)) {
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
    }

    getMarkerCluster() {
        if (null === this.markerCluster) {
            this.initMarkerCluster()
        }

        return this.markerCluster

    }

    render(point) {
        let image = ''
        if (typeof point['image'] !== "undefined") {
            image = point['image']
        }
        let marker = new google.maps.Marker({
            map: this.getMap(),
            position: {lat: point.lat, lng: point.lng},
            icon: image
        })
        this.markers.push(marker)
    }

    getImagePath() {
        return 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    }

}
