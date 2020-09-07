class BaseMap {

    constructor(url, token = $('meta[name="csrf-token"]').attr('content')) {
        this.url = url
        this.token = token
        this.map = null

    }

    initMap() {
        this.map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: {lat: 40.413679, lng: -3.707442},
            mapTypeId: "terrain"
        })
    }

    getMap() {
        if (null === this.map) {
            this.initMap()
        }

        return this.map
    }

    request(success, data = null, method = 'POST') {
        $.ajax({
            url: this.url,
            success: success,
            data: data,
            headers: {
                'X-CSRF-TOKEN': this.token,
            },
            method: method
        })
    }

}
