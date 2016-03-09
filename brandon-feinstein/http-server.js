var http = require('http');
var fs = require('fs');
var url = require('url');
var dateformat = require('dateformat');
// var name;
var server = http.createServer((req, res) => {
  var name = req.url.split('/')[2];
  console.log(name);
  if(req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {'Content-Type':'text/plain'}); //tells what kind of response status and what format the response will be in
    res.write('Hello!');

    res.end();
  }
  if(req.method === 'GET' && req.url === '/time') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var time = new Date();
    var correctTime = dateformat(time);
    res.write(correctTime);
    // res.write(JSON.stringify(time));
    res.end();
  }
  if(req.method === 'GET' && req.url === '/greet/' + name) {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    res.write('Hello ' + name);
    res.end();
  }
  if(req.method === 'POST' && req.url === '/greet') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.JSON("hello");
    res.end();
  }

}).listen(3000, () => console.log('server up on 3000'));
