'use strict'

const server = require('./server.js')
const url = require('url')
const express = require('express')
const app = express()

app.get('/:query', (req,res,next) => {
	let endpoint = req.params.query
	let response = {}
  res.writeHead(200, { 'Content-Type': 'application/json' })
	if (parseInt(endpoint) === NaN){
		let date = new Date(endpoint)
    response['natual'] = endpoint
    response['unix'] = date.getTime()
	}
	else if (parseInt(endpoint) > 2678400000 && parseInt(endpoint) != Infinity){
		let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let date = new Date(endpoint)
    response['natural'] = months[date.getMonth()] + " " + date.getDay() + ", " + date.getFullYear()
		response['unix'] = endpoint
	}
	else{
		response = {
      'natural': null,
      'unix': null
    }
	}
	res.end(JSON.stringify(response))
})
