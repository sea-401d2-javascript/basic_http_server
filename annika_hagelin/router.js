exports.route = function(handle, req, res) {
  if (typeof handle[req.url] === 'function') {
    handle[req.url](req, res);
  } else {
    console.log('404 not found');
    res.writeHead(404, {'content-type': 'text/html'});
    res.write('<h1>404 not found</h1>');
    res.end();
  }
};
