'use strict'

const url = require('url')
const express = require('express')
const app = express()

app.route('/:query').get((req,res,next) => {
	console.log('HI!')
  let endpoint = req.params.query
  console.log(endpoint)
	let response = {
      'natural': null,
      'unix': null
    }
  res.writeHead(200, { 'Content-Type': 'application/json' })
  let date = new Date(endpoint)
  if (date != 'Invalid Date' ){
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    response['natural'] = months[date.getMonth()] + " " + date.getDay() + ", " + date.getFullYear()
		response['unix'] = date.getTime()
	}
	res.end(JSON.stringify(response))
})

const server = require('./server.js')