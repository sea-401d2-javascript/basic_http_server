var http = require('http');
var fs = require('fs');

var server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/time') {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write();
    return res.end();
  }

  if (req.method === 'GET' && req.url === '/greet') {

  }

  if (req.method === 'POST' && req.url === '/greet') {
    res.writeHead(200, {'Content-Type': 'text/html'})

  }

  res.writeHead(404, {'Content-Type': 'application/json'})
  res.write('404 whatever you were looking for was not found. Sorry');
  res.end();
}).listen(3000, () => console.log('server is up on 3000'));
