/**
 * Copyright (c) 2020
 * 
 * forecast module that provides the weather data given a latitutde and longitude.
 * 
 * @author Chun Wu <the.chun.wu@gmail.com>
 * 
 * Created: February 01, 2020
 * 
 */

const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/82df47f99719ff553fe0c2cd22284615/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'
    
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weathr service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.',undefined)
        } else {
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees celsius out. The high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
    
}

module.exports = forecast