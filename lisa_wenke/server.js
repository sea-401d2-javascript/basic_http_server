'use strict';

var http = require('http');
var fs = require('fs');
var moment = require('moment');

var name1 = 'Lisa';


http.createServer((req, res) => {
  if(req.method === 'GET' && req.url === '/time') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(moment().format());
    return res.end();
  }

  if(req.method === 'GET' && req.url === ('/greet/' + name1)) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('hello, ' + name1);
    return res.end();
  }

  if(req.method === 'POST' && req.url === '/greet') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    console.log('hello, ' + name1);
    res.write('hello, ' + name1);
    return res.end();
  }
  if(req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var index = fs.createReadStream(__dirname + '/public/index.html');
    return index.pipe(res);
  }
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.write('404 Not Found');
  return res.end();
}).listen(3000, () => {
  console.log('server is up on 3000');
});
