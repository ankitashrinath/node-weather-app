const request = require('postman-request')


const forcast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=f7925189b0b92b9e45f7a44ab4cc522f&query='+latitude+','+longitude;

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weatherstack service', undefined)
        } else if (body.error) {
            callback('Unable to find the search place', undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }

    })
}

module.exports = forcast