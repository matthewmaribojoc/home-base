// import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const nodemailer = require("nodemailer");

var handlebars = require('handlebars');
var fs = require('fs');

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

const mongo = require('mongodb')
const MongoClient = mongo.MongoClient
const uri = "mongodb+srv://default-user:a3helKwYSEkUpFK2@cluster0-zexb0.mongodb.net/test?retryWrites=true"

var client;

var mongoClient = new MongoClient(uri, { reconnectTries : Number.MAX_VALUE, autoReconnect : true, useNewUrlParser : true }) // allows for connection to the db
mongoClient.connect((err, db) => { // returns a connection to the mongodb
  if (err != null) {
    console.log(err)
    return
  }
  client = db
})

const app = express() // create your express app

// make app use dependencies
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.get('/homes', (req, res) => {
  const collection = client.db("test").collection("homes")
  collection.find({}).toArray(function (err, results) {
    res.send(results)
  })
})

app.get('/extreme-weather', (req, res) => {
  const collection = client.db("test").collection("homes")
  collection.find({}).toArray(function (err, results) {
    readHTMLFile(__dirname + '/../../emergency-email/index.html', function(err, html) {
        var template = handlebars.compile(html);

        var html = template();

        for (var i = 0; i < results.length; i++) {
          if (results[i].email != null && results[i].email.length > 0) {
            sendMessage(results[i].email, 'DANGEROUS WEATHER AHEAD', html)
          }
        }
        res.send('Notifications Sent Out')
    });

  })
})

var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

async function sendMessage (to, subject, html) {

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'contact.bemyneighbor@gmail.com', // generated ethereal user
      pass: 'Tartan2019' // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '🏡 Won\'t You Be My Neighbor? <contact.bemyneighbor@gmail.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: html // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)
}
app.get('/send-message', (req, res) => {

  res.send('')
})

app.post('/sendMatchEmail', (req, res) => {
  readHTMLFile(__dirname + '/../../match-email/index.html', function(err, html) {
      var template = handlebars.compile(html);

      var html = template();

      sendMessage(req.body.email, 'A match has been found.', html)
      res.send('')
  });
})

app.post('/addHome', (req, res) => {
  const collection = client.db("test").collection("homes")

  collection.insertOne(req.body.data, function (err, results) {

    readHTMLFile(__dirname + '/../../registration-email/index.html', function(err, html) {
        var template = handlebars.compile(html);

        var html = template();

        sendMessage(req.body.data.email, 'Thanks for being a good neighbor.', html)
        res.send(req.body.data)
    });
  })
})

app.post('/findHome', (req, res) => {
  const collection = client.db("test").collection("homes")
  collection.find({}).toArray(function (err, results) {
    var valid = []

    for (var i = 0; i < results.length; i++) {
      var score = 100
      var home = results[i]

      if (home.rooms < req.body.data.total) {
        continue
      }
      if (req.body.data.kids && !home.kids) {
        continue
      }

      var location = req.body.data.location;

      if (home.location == null || location == null) {
        continue
      }
      if (Math.abs(location.position.lat - home.location.position.lat) > 1) {
        continue;
      }
      if (Math.abs(location.position.lon - home.location.position.lon) > 1) {
        continue;
      }
      if (req.body.data.accessibility) {
        for (var property in req.body.data.accessibility) {
          if (req.body.data.accessibility[property] && !home.accessibility[property]) {
            score -= 10
          }
        }
      }

      valid.push({
        home: home,
        score: score
      })
    }

    res.send(valid)
  })
})

app.post('/weather', (req, res) => {

  var params = 'id=524901&APPID=7040203a16191db0180ea67bb269bf9b&lat=' + req.body.lat + '&lon=' + req.body.lon + ''
  var scriptCall = new XMLHttpRequest()
  scriptCall.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?' + params, true)
  scriptCall.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  scriptCall.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  scriptCall.onreadystatechange = function () {
    if (scriptCall.readyState === 4) {
      var data = JSON.parse(scriptCall.responseText)
      res.send(data);
    }
  }
  scriptCall.send(params)
})



app.post('/location', (req, res) => {
  var params = 'api-version=1.0&subscription-key=ioE_-AdAyyS3-W9gRuNGaa4MMtf6OAYzjQn_nhKUnX4&query=' + req.body.query
  var scriptCall = new XMLHttpRequest()
  scriptCall.open('GET', 'https://atlas.microsoft.com/search/address/json?' + params, true)
  scriptCall.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  scriptCall.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  scriptCall.onreadystatechange = function () {
    if (scriptCall.readyState === 4) {
      var data = JSON.parse(scriptCall.responseText)
      if (data.results == null || data.results === null) {
        res.send([])
        return
      }
      var location = data.results[0]
      var getCoords = new XMLHttpRequest()

      params = 'q=' + encodeURI(location.address.freeformAddress) + '&format=json'
      getCoords.open('GET', 'https://nominatim.openstreetmap.org/search?' + params, true)
      getCoords.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      getCoords.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      getCoords.onreadystatechange = function () {
        if (getCoords.readyState === 4) {
          var coords = JSON.parse(getCoords.responseText)
          if (coords == null || coords.length == 0) {
            res.send(location)
          } else {
            location.position.lat = coords[0].lat
            location.position.lon = coords[0].lon

            res.send(location)
          }

        }
      }
      getCoords.send(params)
    }
  }
  scriptCall.send(params)
})
app.listen(process.env.PORT || 8081) // client is already running on 8080
