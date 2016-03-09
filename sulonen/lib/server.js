'use strict';

const net = require('net');
const fs = require('fs');

var server = net.createServer((connection) => {
  connection.on('data', (data) => {
    console.log(data.toString('utf-8'));
    var date = new Date();
    var dateString = date.getTime();
    fs.writeFile(__dirname + '/../logs/' + dateString
        + '.log', data, (err) => {
          if (err) throw err;
        });
  });

  connection.on('end', () => {
    console.log('connection closed');
  });
});

server.listen(3000, () => {
  console.log('server listening on port 3000');
});

exports.server = server;
