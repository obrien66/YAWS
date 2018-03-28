require('dotenv').config()

var http = require("http")
var {handler} = require("./handler")
var port = process.env.PORT

var server = http.createServer(handler)
server.listen(port)
