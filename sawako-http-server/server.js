'use strict';
var http = require('http');
// var fs = require('fs');
var currentTime;
var id;

http.createServer((req,res) =>{

  timeStamp();

  if(req.method === 'GET' && req.url === '/time'){
    res.writeHead(200,{'content-type': 'text/html'});
    res.write(currentTime);
    return res.end();
  }

  if(req.method === 'POST' && req.url === '/greet'){
    req.on('data', (data) =>{
      id = JSON.parse(data).greet;
      console.log(id);
    });
    res.writeHead(200,{'content-type': 'text/html'});
    return res.end();
  }

  if(req.url === '/greet/' + id){
    console.log('Here is get: ' + id);
    res.writeHead(200,{'content-type': 'text/html'});
    res.write('Hello, ' + id + '!');
    return res.end();
  }


}).listen(3000, ()=> console.log('Port 3000 started!'));

// **************************************************************
//creating time stamp and call-site is in the first if statement
// **************************************************************
function timeStamp (){
  var now = new Date();
  var hour = now.getHours();
  var min = now.getMinutes();
  var sec = now.getMilliseconds();
  currentTime = 'Current time is: ' + hour + ':' + min + ':' + sec + '(seconds shown in milliseconds)';

  return currentTime;
}
