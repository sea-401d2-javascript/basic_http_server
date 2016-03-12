'use strict';

var http = require('http');
var fs = require('fs');
var moment = require('moment');



var server = http.createServer((req, res) => {
  if(req.method === 'GET' && req.url === '/time') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(moment().format());
    return res.end();
  }

  if(req.method === 'GET' && req.url === '/greet/name') {
    var name = 'Lisa';
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>hello, ' + name + '</h1>');
    return res.end();
  }

  if(req.method === 'POST' && req.url === '/greet/') {
    req.on('data', (data) => {
      console.log(String(data));
      res.write(String(data));
      res.end();
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('hello');
    return res.end();
  }
  if(req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var index = fs.createReadStream(__dirname + '/public/index.html');
    return index.pipe(res);
  }
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.write('404 Not Found');
  res.end();
}).listen(3000, () => {
  console.log('server is up on 3000');
});
