var properties = {
    elo: {
        type: Array,
        required: true
    },
    tourneys: {
        type: Array,
        required: true
    }
}

var User = loopback.Model.extend('User', properties);