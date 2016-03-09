'use strict';

const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {

  // root
  if (req.url === '/') {
    res.writeHead(200, {'content-type': 'text/html'});
    res.write('<h1>All your base are belong to us...</h>\n');
    return res.end();
  }
  // time
  if (req.method === 'GET' && req.url === '/time') {
    var time = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    var timeString = hours + ':' + minutes + ':' + seconds;
    res.writeHead(200, {'content-type': 'text/html'});
    res.write(timeString + '\n');
    return res.end();
  }

  var nameUrl = new RegExp(/\/greet\/(.*)$/);
  if (req.method === 'GET' && nameUrl.test(req.url)) {
    var match = nameUrl.exec(req.url);
    res.writeHead(200, {'content-type': 'text/html'});
    res.write('Hail and well met, ' + match[1] + '!\n');
    return res.end();
  }

  // default case
  res.writeHead(404, {'content-type': 'text/html'});
  res.write('404 Not Found\n');
  res.end();
}).listen(3000, () => console.log('Server listening on port 3000'));