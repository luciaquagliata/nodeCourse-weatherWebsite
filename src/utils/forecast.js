const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e970a3d47c27688841fd045051c46044&query=' + latitude + ',' + longitude + '&units=m' 

    request( {url, json: true}, (error, {body}) => {

        if(error) {
            callback('Unable to connect to the weather service', undefined)
        } else{
            if(body.error){ // la variable error existe cuando hay problemas para acceder a la api. pero si x ej le pasamos mal las coordenadas, este error aparece en la response
                callback('Unable to find location', undefined)
            } else{
                //const temperature = response.body.current.temperature
                //const feelslike = response.body.current.feelslike
                callback(undefined, body.current.weather_descriptions[0] + '. It is ' + body.current.temperature + ' degrees today, and it feels like ' + body.current.feelslike)
            }
            
        }
    })
}

module.exports = forecast