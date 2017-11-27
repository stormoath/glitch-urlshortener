'use strict'

const url = require('url')
const express = require('express')
const app = express()

console.log("hi!")

app.route('/api/whoami').get((req,res,next) => {
  console.log("Routing /whoami...")
  let OS = req.get('user-agent').replace(/^[^(]*\(/, "").replace(/\)[^(]*$/, "").split(/\)[^(]*\(/)[0]; 
  let lang = req.get('accept-language').split(",")[0];
  let IP = req.ip;
  let response = {
    "ipaddress": req.ip,
    "language": lang,
    "software": OS
  }
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(response))
})

const server = require('./server.js')