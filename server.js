'use strict';
const http = require('http');
const fs = require('fs');
const util = require('util');

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

  // if (req.url === '/greet') {
  //   let name = 'boogers';
  //   let test = req;
  //   fs.writeFileSync('testLog', util.inspect(test,{depth: null}), 'utf-8');
  //   res.writeHead(200, {'Content-Type': 'text/html'});
  //   res.write(JSON.stringify('Hello, ' + name));
  //   return res.end();
  // }
  // Don't need to check request method because /greet and /greet/ are different destinations
  if (req.url === '/greet') {
    var name = '';

    req.on('data', function (data) {
      name += data;
    });

    return req.on('end', function () {
      name = JSON.parse(name).name;
      fs.writeFileSync('testLog', util.inspect(name,{depth: null}), 'utf-8');
      res.write(JSON.stringify('Hello, ' + name));
      return res.end();
    });
  }

  // Don't need to check request method because /greet and /greet/ are different destinations
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
