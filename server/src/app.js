// import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

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

app.post('/location', (req, res) => {
  var params = 'api-version=1.0&subscription-key=ioE_-AdAyyS3-W9gRuNGaa4MMtf6OAYzjQn_nhKUnX4&query=' + req.body.query
  var scriptCall = new XMLHttpRequest()
  scriptCall.open('GET', 'https://atlas.microsoft.com/search/address/json?' + params, true)
  scriptCall.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  scriptCall.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  scriptCall.onreadystatechange = function () {
    if (scriptCall.readyState === 4) {
      var data = JSON.parse(scriptCall.responseText)
      console.log(data.results[0])
      res.send(data.results[0]);
    }
  }
  scriptCall.send(params)
})
app.listen(process.env.PORT || 8081) // client is already running on 8080
