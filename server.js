'use strict';
const http = require('http');
const fs = require('fs');

var server = http.createServer((req, res) => {
  var url = req.url;
  var name = url.substring(7,url.length);

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
  if (req.url === '/greet/' + name) {
    res.writeHead(200, {'content-type': 'text/html'});
    res.write('Hello ' + name + ', how are you?');
    return res.end();

  }
  if (req.url === '/greet') {
    console.log(JSON.parse(req.text.name));
    res.writeHead(200, {'content-type': 'text/html'});
    return res.end();

  }

}).listen(3000, () => {console.log('Server up on port 3000');});
