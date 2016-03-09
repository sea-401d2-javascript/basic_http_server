var http = require('http');
// var fs = require('fs');

var currentTime;

http.createServer((req,res) =>{
  var id = req.url.param;
  timeStamp();


  if(req.url === '/time'){
    res.writeHead(200,'Content-Type: test/html');
    res.write(currentTime);
    res.end();
  }

  if(req.url === '/greet/' + id){
    res.writeHead(200,'Content-Type: test/html');
    res.write(id);
    res.end();
  }
}).listen(3000, ()=> console.log('Port 3000 started!'));


function timeStamp (){
  var now = new Date();
  var hour = now.getHours();
  var min = now.getMinutes();
  var sec = now.getMilliseconds();
  currentTime = 'Current time is: ' + hour + ':' + min + ':' + sec + '(seconds shown in milliseconds)';

  return currentTime;
}
