'use strict'

const server = require('./server.js')
const url = require('url')
const express = require('express')
const app = express()

app.get('/:query', (req,res,next) => {
	let endpoint = req.params.query
	let response = {}
	if (parseInt(endpoint) === NaN){
		let date = new Date(endpoint)
    response['natual'] = endpoint
    response['unix'] = date
	}
	else if (parseInt(endpoint)){
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
