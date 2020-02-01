/**
 * Copyright (c) 2020
 * 
 * main weather-app nodejs app
 * 
 * @author Chun Wu <the.chun.wu@gmail.com>
 * 
 * Created: February 01, 2020
 * 
 */

// Custom Modules
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Node Core Modules
const path = require('path')

// NPM Modules
const express = require('express')
const hbs = require('hbs')

// Variables
const app = express()
const port = process.env.PORT || 3000

// Path Definition for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars Engine and Views Location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static Directory To Serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Chun Wu'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Chun Wu'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        helpText: "This is some helpful text.",
        name: 'Chun Wu'
    })
})

// app.com/weather
app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            
            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

// Catches 404 Errors
app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Chun Wu',
        errorMessage: 'Help article not found.'
    })
})

// Catches 404 Errors
app.get('*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Chun Wu',
        errorMessage: 'Page not found.'
    })
})

// Start server on port 3000
app.listen(port,() => {
    console.log('Server Started on Port: ' + port)
})