'use strict';

var fs = require('fs');
var http = require('http');


var server = http.createServer((req, res) => {
  var u = req.url.split('/');
  var name = u[2];


  if(req.method === 'GET' && req.url === '/'){
    res.writeHead(200, {'content-type': 'application/json'})
    res.write(JSON.stringify({message: 'hello!'}));
    return res.end();
  }
  if(req.method === 'GET' && req.url === '/time') {
    res.writeHead(200, {'content-Type': 'text/html'})
    var index = fs.createReadStream(__dirname + '/public/index.html');
    return index.pipe(res);
  }
  if(req.method === 'GET' && req.url === '/greet/' + name){
    res.writeHead(200, {'content-Type': 'text/html'})
    res.write('<h1>Hello, ' + name + '!</h1>');
    return res.end();
  }
  if(req.method === 'POST' && req.url === '/greet') {
    res.writeHead(200, {'content-type': 'application/json'});
    req.on('data',(data) => {
      var newData = JSON.parse(data);
      console.log(newData);
      res.write(JSON.stringify(newData));
    });
    req.on('end', ()=> {
      return res.end();
    });
  } else {
      res.writeHead(404, {'content-type': 'text/html'});
      res.write('404 - Not Found');
      res.end();
    }

}).listen(3000, () => console.log('server running on 3000'));
