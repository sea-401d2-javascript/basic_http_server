var http = require('http');
var fs = require('fs');

var server = http.createServer((req, res) => {
  var u = req.url.split('/');
  var name = u[2];


  if (req.method === 'GET' && req.url === '/time') {
    var currenttime = new Date().toLocaleTimeString();
    res.writeHead(200, {'content-type': 'text/html'})
    res.write(currenttime);
    return res.end();
  }

  if (req.method === 'GET' && req.url === '/greet/' + name) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello, ' + name);
    return res.end();
  }

  if(req.method === 'POST' && req.url === '/greet') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    req.on('data', (data) => {
      var namePost = JSON.parse(data);
      res.write(JSON.stringify(namePost));
    })
    req.on('end', () => {
      return res.end()
    });
    // return res.end();
  } else {

  res.writeHead(404, {'content-type': 'text/html'});
  res.write('404 Not Found');
  res.end();
}
}).listen(3000, () => console.log('server up on 3000'));

  // if (req.method === 'GET' && req.url === '/') {
  //   res.writeHead(200, {'content-type': 'text/html'});
  //   var index = fs.createReadStream(__dirname + '/public/index.html');
  //   return index.pipe(res);
  // }


// var server = module.exports = exports = http.createServer((req, res) => {
//   if (req.method === 'GET' && req.url === '/hello') {
//     res.writeHead(200, {'Content-Type': 'application/json'});
//     res.write(JSON.stringify({msg: 'hello world'}));
//     return res.end();
//   }
//
//   if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     var index = fs.createReadStream(__dirname + '/public/index.html');
//     return index.pipe(res);
//   }
//
//   res.writeHead(404, {'Content-Type': 'application/json'});
//   res.write(JSON.stringify({msg: 'page not found'}));
//   return res.end();
// });
//
// server.listen(3000, () => console.log('server up'));
