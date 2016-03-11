var http = require('http');
var url = require('url');
// var fs = require('fs');



var server = http.createServer((req, res) => {
  var reqUrl = url.parse(req.url);
  console.log('reqUrl is');
  console.dir(reqUrl);
  res.writeHead(200, {'content-type': 'text/html'});
  if (reqUrl.path === '/time'){
    return res.end(new Date().toISOString());
  } else if (reqUrl.path.indexOf('/greet') !== -1 && req.method === 'GET') {
    var name = reqUrl.path.match(/^\/greet\/(\w+)$/);
    console.log('name is', name);
    return res.end('Affirmative ' + name[1] + ', I read you.');
  } else if (reqUrl.path === '/greet' && req.method ==='POST') {
    // console.dir(req);
    req.on('data', function(data){
      console.log(JSON.parse(data.toString()));
      return res.end('Affirmative ' + JSON.parse(data.toString())['name'] + ', I read you.');
    });
    // req.on('end', (data) => {
    //   console.log('_______________________________________');
    //   console.log(data);
    // });
    
    // res.end('oh shiiii');
  } else {
    res.writeHead(404, {'content-type': 'text/html'});
    return res.end('I\'m sorry Dave, I\'m afraid I can\'t do that.');
  }
  
  
});

server.listen(3000, () => console.log('server on 3000'));
