'use strict';

var fs = require('fs');
var http = require('http');

var server = http.createServer((req, res) => {
  if(req.method === 'GET' && req.url === '/'){
    res.writeHead(200, {'content-type': 'application/json'})
    res.write(JSON.stringify({message: 'hello!'}));
    return res.end();
  }
  if(req.url === '/time') {
    res.writeHead(200, {'content-Type': 'text/html'})
    var index = fs.createReadStream(__dirname + '/public/index.html');
    return index.pipe(res);
  }
  if(req.url === '/greet'){
    res.writeHead(200, {'content-Type': 'application/json'})
    res.write(JSON.stringify({message: 'Welcome!'}))
    return res.end();
  }
  if(req.method === 'POST' && req.url === 'greet/name') {
    res.writeHead(200, {'content-type': 'text/html'});
    res.write(JSON.stringify('Welcome, name'))
    return res.end();

  }
  res.writeHead(404, {'content-type': 'text/html'});
  res.write('404 - Not Found');
  res.end();
}).listen(3000, () => console.log('server running on 3000'));
