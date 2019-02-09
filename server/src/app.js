// import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const nodemailer = require("nodemailer");

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
  res.send([
    'Home 1',
    'Home 2'
  ])
})

async function sendMessage (to) {

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
    from: 'contact.bemyneighbor@gmail.com', // sender address
    to: to, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)
}
app.get('/send-message', (req, res) => {
  sendMessage('matthewmaribojoc@gmail.com')
  res.send('matthewmaribojoc@gmail.com')
})

app.post('/weather', (req, res) => {

  var params = 'id=524901&APPID=7040203a16191db0180ea67bb269bf9b&lat=' + req.body.lat + '&lon=' + req.body.lon + ''
  var scriptCall = new XMLHttpRequest()
  scriptCall.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?' + params, true)
  scriptCall.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  scriptCall.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  scriptCall.onreadystatechange = function () {
    if (scriptCall.readyState === 4) {
      console.log(scriptCall.responseText)
      var data = JSON.parse(scriptCall.responseText)
      console.log(data)
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
      res.send(data.results[0]);
    }
  }
  scriptCall.send(params)
})
app.listen(process.env.PORT || 8081) // client is already running on 8080
