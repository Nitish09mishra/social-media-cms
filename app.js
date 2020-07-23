// requiring modules...
const path = require('path')
const hbs = require('hbs')
const express = require('express')
require('./src/db/mongoose')
const studentRouter = require('./src/routers/student')
const forecast = require('./utilities/forecast')
var bodyParser = require('body-parser')

// to load the app
const app = express()

// const port = process.env.PORT || 3000  //this port is for heroku

// setting path to express config..
const publicDir = path.join(__dirname, '/public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')

// setup handlebar and views location..
app.set('view engine', 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)


app.use(bodyParser.json())
app.use(studentRouter)


// setting up static directory to server...
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index')
})

app.get('/weather', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'please enter city name.'
    })
    }

    forecast(req.query.search, (error, {city, min, max, weather, country} = {}) => {
        if(error){
            return res.send({error})
        }
        res.send({
            city: city + ', ' + country,
            temp_min: min,
            temp_max: max,
            weather: weather
        })
    })
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/work', (req, res) => {
    res.render('work')
})

app.get('/chat', (req, res) => {
    res.render('chat')
})

app.get('*', (req, res) => {
    res.render('error')
})

// -------------------------------*********************************-------------------------------------************************

// setarting server...
app.listen(3000, () =>{
    console.log('server running on port 3000')
})
