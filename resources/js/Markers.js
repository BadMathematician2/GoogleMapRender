class Markers extends BaseMap {

    constructor(url) {
        super(url);
        this.markerCluster = null

        this.markers = []
    }

    renderMarkers() {
        this.setMarkerCluster()
        google.maps.event.addListener(this.map, 'bounds_changed', (_) => {
            this.request((data) => {
                let points = JSON.parse(data)

                this.markers.forEach(marker => marker.setMap(null))
                this.markerCluster.removeMarkers(this.markers)
                this.markers = []

                points.forEach(point => {
                    if (this.map.getBounds().contains(point)) {
                        this.render(point)
                    }
                })

                this.markerCluster.addMarkers(this.markers)
            })
        })
    }

    setMarkerCluster() {
        if (null === this.markerCluster) {
            this.setMap()
            this.markerCluster = new MarkerClusterer(this.map, [], {
                imagePath: this.getImagePath(),
                gridSize: 200,
                averageCenter: false })
        }
    }

    render(point) {
        let image = ''
        if (typeof point['image'] !== "undefined") {
            image = point['image']
        }
        let marker = new google.maps.Marker({
            map: this.map,
            position: {lat: point.lat, lng: point.lng},
            icon: image
        })
        this.markers.push(marker)
    }

    setGridSize(gridSize) {
        this.markerCluster.setGridSize(gridSize)
    }

    getImagePath() {
        return 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    }




}
