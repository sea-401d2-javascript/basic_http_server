'use strict';

const net = require('net');

function Client() {
  var client = net.connect(3000, () => {
    client.write('GET / HTTP/1.1 Host: localhost:3000 '
        + 'User-Agent: NCSA Mosaic 2.0FB Accept: */*\r\n');
  });

  client.on('data', (data) => {
    console.log(data);
  });

  client.on('end', () => {
    console.log('connection terminated by remote host');
  });
}

exports.Client = Client;
