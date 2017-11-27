'use strict'

const url = require('url')
const express = require('express')
const app = express()

app.route('/:query').get((req,res,next) => {
  let OS = req.get('user-agent').replace(/^[^(]*\(/, "").replace(/\)[^(]*$/, "").split(/\)[^(]*\(/)[0]; 
  let lang = req.get('accept-language').split(",")[0];
  let IP = 
  let response = {
    "ipaddress":"213.233.148.28",
    "language":"en-IE",
    "software":"X11; Linux x86_64"
  }
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(response))
})

const server = require('./server.js')