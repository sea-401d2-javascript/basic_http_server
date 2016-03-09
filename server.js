'use strict';
const http = require('http');
const fs = require('fs');

http.createServer( (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, {'content-type': 'text/html'});
    var index = fs.createReadStream(__dirname + '/lib/index.html');
    return index.pipe(res);
  }
  if (req.url === '/time') {
    res.writeHead(200, {'content-type': 'application/json'});
    let time = new Date();
    res.write(JSON.stringify(time.toUTCString()));
    return res.end();
  }
  if (req.url.indexOf('/greet/') != -1) {
    let nameIndex = req.url.indexOf('/greet/') + 7;
    let name = req.url.slice(nameIndex);
    name = name.replace(/\//g, '');
    res.writeHead(200, {'content-type': 'application/json'});
    res.write(JSON.stringify('Hello, ' + name));
    return res.end();
  }

  res.writeHead(404, {'content-type': 'text/html'});
  res.write('404 Not Found');
  res.end();

}).listen(3000, () => console.log('server up on 3000'));



/*
app.get('/getRandom/:type', function (req, res) {
  console.log('Request for ' + req.params.type + ' Pokemon received');
  getPokemonByType([], res, [req.params.type]);
});
*/
