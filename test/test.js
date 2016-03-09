var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var request = chai.request;
var expect = chai.expect;
require(__dirname + '/../server.js');
var fs = require('fs');

describe('http server tests', () => {
  it('should respond to /time with a date/time'), (done) => {
    request('localhost:3000');
    .get('')
  }
})
