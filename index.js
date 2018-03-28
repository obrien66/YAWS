var http = require("http")
var {handler} = require("./handler")
var port = 8000

var server = http.createServer(handler)
server.listen(port)
