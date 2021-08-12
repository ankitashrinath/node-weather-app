const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')


const app = express()

const pathStatic = path.join('__dirname', '../template/views')
const pathPartials = path.join('__dirname', '../template/partials')
const publicDirPath = path.join('__dirname', '../public')


app.set('view engine', 'hbs')
app.set('views', pathStatic)
hbs.registerPartials(pathPartials)
app.use(express.static(publicDirPath))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Index',
        created: 'Ankita Shrinath'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        created: 'Ankita Shrinath'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        created: 'Ankita Shrinath',
        message: 'This is help page'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        message: 'This help not found'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forcast(latitude, longitude, (error, response) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: 'Its currently  ' + response.temperature + ' degress out. But feels like ' + response.feelslike,
                address: req.query.address,
                location: location
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        message: 'Page not found'
    })
})

app.listen('3000', () => {
    console.log('server started on port 300')
})