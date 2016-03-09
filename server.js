'use strict';
const http = require('http');
const fs = require('fs');

http.createServer( (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, {'content-type': 'text/html'});
    var index = fs.createReadStream(__dirname + '/lib/index.html');
    return index.pipe(res);
  }

  res.writeHead(404, {'content-type': 'text/html'});
  res.write('404 Not Found');
  res.end();

}).listen(3000, () => console.log('server up on 3000'));
