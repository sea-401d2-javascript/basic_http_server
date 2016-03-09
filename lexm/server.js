var http = require('http');
var fs = require('fs');
var moment = require('moment');

var server = http.createServer((req, res) => {

  if(req.method === 'GET' && req.url === '/time') {
    res.writeHead(200, {'content-type': 'text/html'});
    res.write(moment().format());
    return res.end();
  }

  if(req.method === 'GET' && req.url.startsWith('/greet/')) {
    res.writeHead(200, {'content-type': 'text/html'});
    res.write('Hello, ' + req.url.substr(7));
    return res.end();
  }

  if(req.url === '/') {
    res.writeHead(200, {'content-type': 'text/html'});
    var index = fs.createReadStream(__dirname + '/public/index.html');
    return index.pipe(res);
  }

  res.writeHead(404, {'content-type': 'text/html'});
  res.write('404 not found');
  res.end();
}).listen(3000, () => console.log('server up on 3000'));
