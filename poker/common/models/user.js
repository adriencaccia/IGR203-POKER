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

var User = loopback.Model.extend('User', properties);