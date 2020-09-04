class BaseMap {

    constructor(url) {
        this.url = url
        this.map = null
    }

    setMap() {
        if (null === this.map) {
            this.map = new google.maps.Map(document.getElementById("map"), {
                zoom: 8,
                center: {lat: 40.413679, lng: -3.707442},
                mapTypeId: "terrain"
            })
        }
    }

    request(success, data = null, method = 'POST') {
        $.ajax({
            url: this.url,
            success: success,
            data: data,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            },
            method: method
        })
    }

}
