class Markers extends BaseMap {

    constructor(url, center = [40.413679, -3.707442], zoom = 8, type = "terrain", gridSize = 200) {
        super(url, center, zoom, type);
        this.markerCluster = new MarkerClusterer(this.map, [], {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
            gridSize: gridSize,
            averageCenter: false })

        this.markers = []
    }

    renderMarkers() {
        google.maps.event.addListener(this.map, 'bounds_changed', (_) => {
            this.request(this.getOnSuccess())
        })
    }

    getOnSuccess() {
        return (data) => {
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





}
