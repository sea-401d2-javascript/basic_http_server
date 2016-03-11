'use strict';

const http = require('http');
var usrName;

const server = http.createServer((req, res) => {
  if (req.url.length > 6) var custName = req.url.slice(7, req.url.length);
  if (req.method === 'GET' && req.url === '/greet/' + custName) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Welcome</h1><p>Hello '+ custName +', welcome back.</p>');
    return res.end();
  }
  if (req.method === 'GET' && req.url === '/time') {
    var curTime = new Date();
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>The Time Is...</h1><p>'+ curTime +'</p>');
    return res.end();
  }
  // Capture user posted data in a variable
  if (req.method === 'POST' && req.url === '/greet') {
    res.writeHead(200, {'Content-Type': 'text/html'});

    req.on('data', (data) => {
      usrName = JSON.parse(data.toString());
    });

    // This is async, so how would you wait to write the response until after data has been received?
    // I want to be able to include usrName in my response.
    res.write('JSON uploaded successfully');
    return res.end();
  }
  // Display user posted data at /greet
  if (req.method === 'GET' && req.url === '/greet') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<h1>User Posted Data</h1><p>User posted the name "${usrName.name}" to localhost:3000/greet with ${JSON.stringify(usrName)}.</p>`);
    return res.end();
  }
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.write('<h1>404 Not Found</h1>');
  res.end();
});

server.listen(3000, () => console.log('server up on port 3000'));
