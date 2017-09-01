var http = require('http')
var url = require('url')
const server = require('./server.js')

var serv = http.createServer( (req,res) => {
	let err = false
	if(!req.method === 'GET'){
		res.writeHead(400)
		err = true
	}
	let query = url.parse(req.url).query.split('=')
	let endpoint = url.parse(req.url).pathname
	let response = {}
	let date = new Date(query[1])
	if (endpoint.indexOf('unixtime') > 0){
		response['unixtime'] = date.getTime()
	}
	else if (endpoint.indexOf('parsetime') > 0){
		response['hour'] = date.getHours()
		response['minute'] = date.getMinutes()
		response['second'] = date.getSeconds()
	}
	else{
		res.writeHead(404)
	}
	if(!err){
		res.writeHead(200, { 'Content-Type': 'application/json' })
		res.end(JSON.stringify(response))
	}
	else{
		res.end("Server only accepts GET and endpoints parsetime or unixtime")
	}
})
server.listen(process.argv[2])