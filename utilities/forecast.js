const request = require('request')

const forecast = (city , callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?' + 'q=' + city +'&units=metric&APPID=af9e5827746aa9ee6daf39eaa57abd4e'
    request({url: url, json: true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }
        else if(body.message){
            callback('Unable to find location :( ', undefined)
        }
        else{
            callback(undefined, {
                city: body.name,
                min: body.main.temp_min,
                max: body.main.temp_max,
                weather: body.weather[0].description,
                country: body.sys.country
            })
        }
    })
}

module.exports = forecast 