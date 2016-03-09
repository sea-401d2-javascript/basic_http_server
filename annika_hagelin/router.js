exports.route = function(handle, req, res) {
  var path = '/'+req.url.split('/')[1];
  if (typeof handle[path] === 'function') {
    handle[path](req, res);
  } else {
    console.log('404 not found');
    res.writeHead(404, {'content-type': 'text/html'});
    res.write('404 not found');
    res.end();
  }
};
