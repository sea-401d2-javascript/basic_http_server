'use strict'

var http = require('http');
var fs = require('fs');

var server = http.createServer((req, res) => {
  if(req.method === 'POST' && req.url === '/greet') {
    res.writeHead(200, {'content-type': 'text/html'});
    req.on('data', (data) => {
      var newName = JSON.stringify(JSON.parse(data));
      res.write('hello ' + newName);
      console.log(newName);
      res.end();
    })
  }

  if(req.method === 'GET' && req.url === '/time') {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var seconds = date.getSeconds();
    var time = hour + ':' + min + ' ' + seconds + 's PST';

    res.writeHead(200, {'content-type': 'text/html'});
    res.write('The current server time is: ' + time);
    return res.end();
  }

  if (req.method === 'GET' && req.url === '/greet/' + req.url.slice(7)) {
    res.writeHead(200, {'content-type': 'text/html'});
    res.write('Hello, ' + req.url.slice(7) + '!');
    return res.end();
  }
})

server.listen(3000, () => console.log('server started on port 3000'));
