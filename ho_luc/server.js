'use strict'

var http = require('http');
var fs = require('fs');

var server = http.createServer((req, res) => {
  if(req.method === 'GET' && req.url === '/time') {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var seconds = date.getSeconds();
    var time = hour + ':' + min + ' ' + seconds + 's PST';
    console.log(time);
    res.write('the current server time is: ' + time);
    return res.end();
  }


})

server.listen(3000, () => console.log('server started on port 3000'));
