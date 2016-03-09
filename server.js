'use strict';

var http = require('http');
var fs = require('fs');
var url = require('url');
var superagent = require('superagent');
var newDate = new Date();

http.createServer((req, res)=>{
  if(req.method === 'GET' && req.url === '/time'){
    console.log(req.method);
    res.writeHead(200, {'content-type': 'application/json'});
    res.write(JSON.stringify({message: 'This is the current date of the server ' + newDate}));
    res.end();
  };
  if(req.method === 'GET' && req.url.indexOf('/greet/') > -1){
    res.writeHead(200, {'content-type': 'application/json'});
    var thisUrl = url.parse(req.url);
    var thisUrlPath = thisUrl.pathname;
    var rxUrl = thisUrlPath.match(/\Wgreet\/(\w+)/);
    var realUrl = rxUrl[1];
    res.write(JSON.stringify({message: 'Hello ' + realUrl}));
    console.log(res.message);
    res.end();
  };
  if(req.method === 'POST' && req.url === '/greet'){
    res.writeHead(200, {'content-type': 'application/json'});
    req.on('data', (data)=>{
      var newData = data.toString();
      res.write(newData);
      console.log('Hello ', newData);
      res.end();
    });
  };
}).listen(3000, ()=>{
  console.log('Server started on port 3000');
});
