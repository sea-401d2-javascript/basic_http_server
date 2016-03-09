'use strict';

var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer( (req, res) => {

  if(req.url === '/time') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    var now = new Date();
    console.log(now);
    res.write(JSON.stringify({time: now}));
    return res.end();
  }
  var name = "bobby";
  var data = {name: "bobby"};

  if(req.method === 'GET' && req.url === '/greet/' + name) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    //var today = req.url;
    //var trying = [];
    //trying.push(today);
    console.log(name);
    console.log(data);
    //console.log(req.url.splice(4));
    res.write('Hi there ' + name + '!!!!');
    return res.end();
  }
  if(req.method === 'POST' && req.url === '/greet') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    console.log('nailed, it');
    res.write(JSON.stringify({name}));
    return res.end();
  }

  res.writeHead(404, {'content-type': 'text/html'});
  res.write('404 Not Found');
  res.end();

}).listen(3000, () => console.log('server up on port 3000'));
