var http = require('http');
var router = require(__dirname + '/router.js');
var requestHandlers = require(__dirname + '/requestHandlers.js');

var handle = {};
handle['/time'] = requestHandlers.time

http.createServer((req, res) => {
  console.log(req.url);

  router.route(handle, req, res);

}).listen(3000, () => console.log('server speaking.'));
