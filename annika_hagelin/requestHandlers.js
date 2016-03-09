exports.time = function(res, req) {
  console.log('get time');
  req.writeHead(200, {'content-type': 'text/html'});
  var d = new Date();
  req.write(d.toString());
  req.end();
}
