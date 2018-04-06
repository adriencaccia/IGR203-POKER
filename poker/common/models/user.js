var properties = {
    elo: {
        type: number,
        required: true
    },
    tourneys: {
        type: Array,
        required: true
    }
}

var user = loopback.Model.extend('user', properties);