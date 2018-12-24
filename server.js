const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '61bccb1c3e7703d0b980165aa96fe05b';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Sorry Not found'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'sorry Not fount'});
      } else {
        let weatherText = `It's ${(((weather.main.temp)-32)*5)/9} 
        Degrees Celsius in ${weather.name}! and
        Humidity:${weather.main.humidity}%`;
       
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(3001, function () {
  console.log('server started!')
})
