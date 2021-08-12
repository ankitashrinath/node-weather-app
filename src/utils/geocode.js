
const request = require('postman-request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5raXRhc2hyaW5hdGgiLCJhIjoiY2tycTN4OTBiOHRpNDMxcGFkbzVpZ3dwZSJ9.zSBHzgpuvDOKsE12pTFwNg';

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to mapbox service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find the search place', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    }
    )
}

module.exports = geocode