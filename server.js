var http = require('http');
var fs = require('fs');
var date = new Date();
var url = require('url');
// var currentHour = date.getHours();

var server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/time') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(String(date));
    return res.end();
  } else if (req.method === 'GET' && req.url.indexOf('/greet/') > -1) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var thisUrl = url.parse(req.url);
    console.log(thisUrl);
    var thisUrlPath = String(thisUrl.pathname);
    // var thisName = thisUrlPath.split('/');
    // console.log(thisName);
    console.log(thisUrlPath);
    // var regex = new RegExp('/\Wgreet\/(\w+)/');
    var thisUrlName = thisUrlPath.match(/\Wgreet\/(\w+)/);
    console.log('url name is:', thisUrlName[1]);
    res.write(JSON.stringify(thisUrlName[1] + ', hello. I see you there.'));
    return res.end();
  } else if (req.method === 'POST' && req.url === '/greet')
  {
    // res.writeHead(200, {'Content-Type': 'application/json'});
    req.on('data', (data) => {
      var jsonParse = String(data);
      console.log(jsonParse);
      res.write(jsonParse);
      res.end();
    });
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.write('404 whatever you were looking for was  not found. Sorry');
    res.end();
  }
}).listen(3000, () => console.log('server is up on 3000'));
