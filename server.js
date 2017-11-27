'use strict';

var fs = require('fs');
var mongodb = require('mongodb');
var dbclient = mongodb.MongoClient;
var express = require('express');
var app = express();

if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}

app.use('/public', express.static(process.cwd() + '/public'));

app.route('/_api/package.json')
  .get(function(req, res, next) {
    console.log('requested');
    fs.readFile(__dirname + '/package.json', function(err, data) {
      if(err) return next(err);
      res.type('txt').send(data.toString());
    });
  });
  
app.route('/').get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
})

app.route('/favicon.ico').get((req,res,next) => {
  res.status(404);
  res.type('txt').send('Not found');
});

app.get('/new/http*', (req,res,next) => {
  let urlMatcher = /(http|https):\/\/.*\.(com|net|org)\//gi
  let url = req.path.substring(5)
  if (url.match(urlMatcher)){
      const dburl = process.env.MONGODBURI
      dbclient.connect(dburl, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } 
      else {
        console.log('Connection established to', dburl);

        db.collection('urllist').count((err,count)=>{
          if(err === null){
            let urlId = ++count;
            db.collection('urllist').insertOne({
              "urlId": urlId,
              "url": url
            }, (err,result) => {
              if(err === null){
                res.writeHead(200, { 'Content-Type': 'text' })
                res.end("Your URL " + url + " was successfully shortened to https://abiding-sauce.glitch.me/" + urlId);
                db.close();
              }
              else{
                dbError(err)
              }
            })
          }
          else{
            dbError(err)
          }
        })
        function dbError(err){
          res.writeHead(500, { 'Content-Type': 'text' })
          res.end("Database error: " + err);
          db.close();
        }
      }
    })
  }
  else{
    res.writeHead(400, { 'Content-Type': 'text' })
    res.end("Your URL " + url + " is not in a valid format for using this service");
  }
})

app.get(/\d/, (req,res,next) => {
  let entry = Number(req.path.substring(1))
  console.log(entry)
  const dburl = process.env.MONGODBURI
  dbclient.connect(dburl, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } 
    else {
      console.log('Connection established to', dburl);

      let cursor = db.collection('urllist').find({"urlId": entry})
      cursor.each((err,doc)=>{
        if(err =      i && doc !== nullf(err === null && doc.url !== null){
          res.redir
        else if(doc === null){
          res.writeHead(404, { 'Content-Type': 'text' })
          res.end("Your shortened URL https://abiding-sauce.glitch.me/" + entry + " was not found in the database");
        }ect(doc.url)            
        }
        else{
          dbError(err)
        }
      })
    }
  })
})


// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found! Request was ' + req.path);
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});


function dbError(err){
  res.writeHead(500, { 'Content-Type': 'text' })
  res.end("Database error: " + err);
  db.close();
}
