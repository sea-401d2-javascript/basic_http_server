exports.time = (req, res) => {
  console.log('get time');
  res.writeHead(200, {'content-type': 'text/html'});
  var d = new Date();
  res.write(d.toString());
  res.end();
};

exports.greet = (req, res) => {
  var name = req.url.split('/')[2];
  res.writeHead(200, {'content-type': 'text/html'});
  res.write('hello, '+name);
  res.end();
};
