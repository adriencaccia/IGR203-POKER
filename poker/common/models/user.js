var properties = {
    elo: {
        type: Array,
        required: true
    },
    playedTourneys: {
        type: Array,
        required: true
    },
    userTourneys: {
        type: Array,
        required: true
    }
}

var User = loopback.Model.extend('User', properties);