var express = require('express')
// eslint-disable-next-line
var path = require('path')
var serveStatic = require('serve-static')
// eslint-disable-next-line
app = express()
// eslint-disable-next-line
app.use(serveStatic(__dirname + '/dist'))
var port = process.env.PORT || 5000
// eslint-disable-next-line
app.listen(port)
// eslint-disable-next-line
console.log('server started ' + port)
