module.exports = {
	handler: handleFunction
}

var fs = require("fs")
var {STATUS_CODES} = require("http")

var textTypes = {
	js: "javascript",
	html: "html",
	css: "css",
	txt: "plain"
}
var imgType = {
	gif: "gif",
	jpeg: "jpeg",
	png: "png",
	svg: "svg+xml",
	jpg: "jpg"
}

function handleFunction(req, res) {
	let path
	let type
	let group = "text"
	if (req.url === "/") {
		path = __dirname + "/static/index.html"
		type = "html"
	}
	else {
		path = __dirname + "/static/" + (req.url.substring(1))
		type = req.url.split(".").reverse()[0]
		if (textTypes[type] === undefined) {
			group = "image"
			type = imgType[type]
		}
		else {
			group = "text"
			type = textTypes[type]
		}
		console.log(`${req.url} responded as ${group}`)
	}
	fs.readFile(path, "utf8", (err, data) => {
		if (err) {
			var msg = error(404)
			res.writeHead(404, "File Not Found", {
				"Content-length": Buffer.byteLength(msg),
				"Content-type": "text/html"
			})
			res.end(msg)
		}
		else {
			res.writeHead(200, {
				"Content-length": Buffer.byteLength(data),
				"Content-type": group + "/" + type
			})
			res.end(data)
		}
	})
}

function error(code){
	var style = fs.readFileSync("util/error.css", "utf8")
	var head = `
		<style>${style}</style>
		<h1>${code}: ${STATUS_CODES[code]}</h1>
		<hr>
		<ul>`

	var fileList = fs.readdirSync(__dirname + "/static/")
	fileList = fileList
	.map(item => {
		return `<li><a href="${item}">${item}</a></li>`
	})
	.join("<br>")
	return head + fileList + "</ul>"
}
