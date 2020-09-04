class BaseMap {

    constructor(url, center = [40.413679, -3.707442], zoom = 8, type = "terrain") {
        this.url = url
        this.map = new google.maps.Map(document.getElementById("map"), {
            zoom: zoom,
            center: {lat: center[0], lng: center[1]},
            mapTypeId: type
        })

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            }
        })

    }

    request(onSuccess, method = 'POST') {
        $.ajax({
            url: this.url,
            success: onSuccess,
            method: method
        })
    }

}
