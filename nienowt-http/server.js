var http = require('http');



var server = http.createServer((req, res) => {
  var id = req.url.split('/')[2];
  var usr;

  if (req.method === 'GET' && req.url === '/time') {
    var time = new Date();
    res.writeHead(200, {'content-type':'text/html'});
    res.write('IT IS CURRENTLY: '+ time.toString().substr(4,20));
    return res.end();
  }

  if(req.method === 'GET' && req.url === '/greet/' + id) {
    res.writeHead(200, {'content-type':'text/html'});
    res.write('Welcome '+ id + ', this is life now.');
    return res.end();
  }

  if(req.method === 'POST' && req.url === '/greet') {
    res.writeHead(200, {'content-type':'text/http'});
    req.on('data',(data) =>{
      var user = data.toString();
      usr = JSON.parse(user);
      console.log('Welcome', usr.name);

    })
    // res.write('welcome ' +usr.name);
    return res.end();
  }

  res.writeHead(404, {'content-type':'text/html'});
  res.write('Nope ;( ');
  return res.end();

}).listen(3000, () => console.log('alive: three thousand'));
