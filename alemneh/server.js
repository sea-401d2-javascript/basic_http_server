'use strict';
const http = require('http');
const fs = require('fs');
var name;
var server = http.createServer((req, res) => {

  if (req.url === '/') {
    res.writeHead(200, {'content-type': 'text/html'});
    var index = fs.createReadStream(__dirname + '/public/index.html');
    return index.pipe(res);

  }
  if (req.url === '/time') {
    res.writeHead(200, {'content-type': 'text/html'});
    var date = new Date();
    var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    res.write(time);
    return res.end();

  }
  if (req.url === '/greet' && req.method === 'POST') {
    req.on('data', (data) => {
      name = JSON.parse(data).name;
      res.writeHead(200, {'content-type': 'text/html'});
      res.write(name);
      return res.end();
    });

  }
  if (req.url === '/greet/' + name) {
    res.writeHead(200, {'content-type': 'text/html'});
    res.write('Hello ' + name + ', how are you?');
    return res.end();

  }

}).listen(3000, () => {console.log('Server up on port 3000');});
