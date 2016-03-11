'use strict';

var http = require('http');
var fs = require('fs');

var server = http.createServer( (req, res) => {
  var name = req.url.split('/')[2];
  if(req.url === '/time') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    var now = new Date();
    console.log(now);
    res.write(JSON.stringify({time: now}));
    return res.end();
  }

  if(req.method === 'GET' && req.url === '/greet/' + name) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('hello, ' + name);
    return res.end();
  }

  if(req.method === 'POST' && req.url === '/greet') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    console.log('nailed, it');
    res.write(JSON.stringify({'name': name}));
    return res.end()
  }

  res.writeHead(404, {'content-type': 'text/html'});
  res.write('404 Not Found');
  res.end();

}).listen(3000, () => console.log('server up on port 3000'));
