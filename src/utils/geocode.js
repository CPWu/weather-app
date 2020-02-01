/**
 * Copyright (c) 2020
 * 
 * geocoding module that will provide a latitutde and longtitude given a text based location.
 * 
 * @author Chun Wu <the.chun.wu@gmail.com>
 * 
 * Created: February 01, 2020
 * 
 */

const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2F0ZXJpYWwiLCJhIjoiY2p1cHpoamJtMWQybDN5bHRoc2NhZ3AwdSJ9.OOKUjFXanPJi3jUtRc_WpA'

    request({url, json:true},(error,{body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name                
            })
        }
    })
}

module.exports = geocode