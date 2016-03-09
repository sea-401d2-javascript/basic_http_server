var http = require('http');
var fs = require('fs');

var server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hi');
    return res.end();
  }

  if (req.method === 'GET' && req.url === '/time') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(new Date());
    return res.end();
  }

  if (req.method === 'GET' && req.url === '/greet/:name') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(req.params.name);
    return res.end();
  }

  if (req.method === 'POST' && req.url === '/greet') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    return res.end();
  }

  res.writeHead(404, {'Content-Type': 'text/html'});
  res.write('404 Not Found');
  return res.end();

}).listen(3000, () => console.log('server up on 3000'));